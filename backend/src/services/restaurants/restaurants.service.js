import { Exception } from '../../utiles/exception/Exception.js';
import { Success } from '../../utiles/success/success.js';
import RestaurantsRepository from '../../repositories/restaurants/restaurants.repository.js';
import MembersRepository from '../../repositories/member/members.repository.js';
import { s3upload } from '../../utiles/function/s3.upload.js';

export default class RestaurantsService {
    restaurantsRepository = new RestaurantsRepository();
    memberRepository = new MembersRepository();

    /**
     * 음식점 등록
     * @param {object} fileObj
     * @param {object} bodyObj
     * @param {string} memberId
     */
    createRestaurant = async (fileObj, bodyObj, memberId) => {
        if (!bodyObj.name) {
            throw new Exception(400, '사업장 이름은 필수 입력값 입니다.');
        } else if (!bodyObj.cate) {
            throw new Exception(400, '음식 카테고리는 필수 입력값 입니다.');
        } else if (!fileObj) {
            throw new Exception(400, '사업장 이미지는 필수로 존재해야 합니다.');
        }

        const selectMember = await this.memberRepository.getMember(memberId);
        if (selectMember.ownerYn !== 'OWNER') {
            throw new Exception(
                400,
                '사장님이 아닌 회원은 음식점을 등록할수 없습니다.'
            );
        }

        const selectRestaurant = await this.restaurantsRepository.getRestaurant(
            memberId
        );
        if (selectRestaurant) {
            throw new Exception(
                400,
                '해당 사장님은 이미 음식점을 등록하셨습니다.'
            );
        }

        const imageUploadResult = await s3upload(fileObj);

        const newRestaurant = new Restaurant(
            +selectMember.id,
            bodyObj.name,
            bodyObj.description,
            bodyObj.cate,
            imageUploadResult.Location
        );
        const createdRestaurant =
            await this.restaurantsRepository.createdRestaurant(newRestaurant);

        return new Success(201, '음식점이 생성되었습니다.', createdRestaurant);
    };

    /**
     * 음식점 목록 조회
     * @param {*} params
     * @param {*} query
     * @returns
     */
    getRestaurants = async (params, query) => {
        const { cate } = params;
        const { search } = query;

        const selectAllRestaurants =
            await this.restaurantsRepository.getRestaurants(cate, search);

        return new Success(
            200,
            '음식점 목록이 조회되었습니다',
            selectAllRestaurants
        );
    };

    /**
     * 음식점 상세 조회
     * @param {*} params
     * @returns
     */
    getRestaurant = async params => {
        const { restaurantId } = params;

        try {
            const selectRestaurant =
                await this.restaurantsRepository.getRestaurantAllInfo(
                    restaurantId
                );

            return new Success(
                200,
                '음식점 상세정보 조회를 성공하였습니다',
                selectRestaurant
            );
        } catch (err) {
            return new Exception().exceptionServer();
        }
    };

    /**
     * 음식점 수정
     * @param {*} fileObj
     * @param {*} bodyObj
     * @param {*} memberId
     * @param {*} restaurantId
     * @returns
     */
    updateRestaurant = async (fileObj, bodyObj, memberId, restaurantId) => {
        if (!bodyObj.name && !bodyObj.cate && !fileObj) {
            throw new Exception(400, '변경 사항이 존재하지 않습니다.');
        }

        const selectRestaurant =
            await this.restaurantsRepository.getRestaurantAllInfo(restaurantId);

        if (selectRestaurant.member.id !== memberId) {
            throw new Exception(400, '해당 음식점 사장님 계정이 아닙니다.');
        }

        let imageUploadResult;
        if (fileObj) {
            imageUploadResult = await s3upload(fileObj).Location;
        } else {
            imageUploadResult = selectRestaurant.image;
        }

        const updateRestaurant = new Restaurant(
            +selectRestaurant.member.id,
            bodyObj.name ? bodyObj.name : selectRestaurant.name,
            bodyObj.description
                ? bodyObj.description
                : selectRestaurant.description,
            bodyObj.cate ? bodyObj.cate : selectRestaurant.cate,
            imageUploadResult
        );

        try {
            const updatedResult =
                await this.restaurantsRepository.updateRestaurant(
                    updateRestaurant,
                    restaurantId
                );

            return new Success(
                201,
                '음식점 정보가 수정되었습니다',
                updatedResult
            );
        } catch (err) {
            return new Exception().exceptionServer();
        }
    };

    /**
     * 음식점 삭제
     * @param {*} params
     * @param {*} memberId
     * @returns
     */
    deleteRestaurant = async (params, memberId) => {
        const { restaurantId } = params;

        const selectRestaurant =
            await this.restaurantsRepository.getRestaurantAllInfo(restaurantId);

        if (selectRestaurant.member.id !== memberId) {
            throw new Exception(400, '해당 음식점 사장님 계정이 아닙니다.');
        }

        const deletedRestaurant =
            await this.restaurantsRepository.deleteRestaurant(restaurantId);

        return new Success(200, '삭제가 성공하였습니다', deletedRestaurant);
    };
}

class Restaurant {
    constructor(memberId, name, description, cate, image) {
        this.memberId = memberId;
        this.name = name;
        this.description = description;
        this.cate = cate;
        this.image = image;
    }
}
