import ReviewsRepository from "../../repositories/reviews/reviews.repository";
import OrderRepository from "../../repositories/orders/orders.repository"
import { Exception } from "../../utiles/exception/exception"
import { Success } from "../../utiles/success/success"


export default class ReviewsService {
    reviewsRepository = new ReviewsRepository();
    orderRepository = new OrderRepository();

    createReview = async (memberId, params, bodyObj) => {
        const { orderId, restaurantId } = params;
        const { review, score } = bodyObj;

        const selectOrder =
            await this.orderRepository.getOrderAllInfo(orderId);

        if (selectOrder.restaurantId !== restaurantId) {
            throw new Exception(
                400,
                '리뷰는 주문한 매장에만 남길 수 있습니다.'
            )
        };

        if (!review || !score) {
            throw new Exception(
                400,
                '리뷰 등록에 필요한 값이 입력되지 않았습니다..'
            );
        };

        const newReview = new Review(
            restaurantId,
            orderId,
            review,
            score
        );

        const createdReview = await this.reviewsRepository.createMenu(newMenu);

        return new Success(201, '리뷰가 생성되었습니다.', createdReview);
    };

    getReviews = async params => {
        const { restaurantId } = params;

        const getReviews = await this.reviewsRepository.getReviews(restaurantId);
        return new Success(200, '리뷰 조회 성공', getReviews);
    };

    getReview = async params => {
        const { reviewId } = params;
        const getReview = await this.reviewsRepository.getMenu(menuId);

        if (!getReview) {
            throw new Exception(400, '잘못된 리뷰 입니다.');
        }

        return new Success(200, '리뷰 조회 성공', getReview);
    }

    updateReview = async (params, body, memberId) => {
        const { reviewId, memberId, restaurantId, orderId } = params;
        const { review, score } = body;

        const selectReview = await this.reviewsRepository.getReviewAllInfo(reviewId);

        if (selectReview.memberId !== memberId) {
            throw new Exception(400, '해당 리뷰 작성자가 아닙니다.');
        }
        if (!selectReview) {
            throw new Exception(400, '해당 리뷰는 존재하지 않습니다.');
        }
        if (!review && !score) {
            throw new Exception(400, '수정 사항이 없습니다.');
        }

        const prevReview = await this.reviewsRepository.getReview(reviewId);

        const updateReview = new Review(
            memberId,
            restaurantId,
            orderId,
            review || prevReview.review,
            score || prevReview.score
        )

        const updatedReview = await this.reviewsRepository.updateReview(
            reviewId,
            updateReview
        );

        return new Success(200, '리뷰 정보를 수정하였습니다.', updatedReview);
    };

    deleteReview = async (params, memberId) => {
        const { reviewId } = params;

        const selectReview = await this.reviewsRepository.getReview(
            reviewId
        );

        if (selectReview.memberId !== memberId) {
            throw new Exception(400, '해당 리뷰 작성자가 아닙니다.');
        }
        if (!selectReview) {
            throw new Exception(400, '해당 리뷰는 존재하지 않습니다.');
        }

        const deletedReview = await this.reviewsRepository.deleteReview(reviewId);

        return new Success(200, '리뷰 삭제가 완료되었습니다.', deletedReview);

    }
};


class Review {
    constructor(restaurantId, orderId, review, score) {
        this.restaurantId = +restaurantId;
        this.orderId = orderId;
        this.review = review;
        this.score = +score;
    }
}