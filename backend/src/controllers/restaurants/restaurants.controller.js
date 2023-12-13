import RestaurantsService from '../../services/restaurants/restaurants.service.js';

export default class RestaurantsController {
    restaurantsService = new RestaurantsService();

    /**
     * 음식점 등록 API
     * @param {*} req
     * @param {*} res
     */
    createRestaurant = async (req, res) => {
        const memberId = 5;
        try {
            const createdResult =
                await this.restaurantsService.createRestaurant(
                    req.file,
                    req.body,
                    memberId
                );

            res.status(createdResult.status).json(createdResult);
        } catch (err) {
            return res.status(err.status).json({ data: err });
        }
    };

    /**
     * 음식점 목록 조회 API
     * @param {*} req
     * @param {*} res
     */
    getRestaurants = async (req, res) => {
        try {
            const selectAllRestaurants =
                await this.restaurantsService.getRestaurants(
                    req.params,
                    req.query
                );

            res.status(selectAllRestaurants.status).json(selectAllRestaurants);
        } catch (err) {
            return res.status(err.status).json({ data: err });
        }
    };

    /**
     * 음식점 상세 조회 API
     * @param {*} req
     * @param {*} res
     * @returns
     */
    getRestaurant = async (req, res) => {
        try {
            const selectRestaurant =
                await this.restaurantsService.getRestaurant(req.params);

            res.status(selectRestaurant.status).json(selectRestaurant);
        } catch (err) {
            return res.status(err.status).json({ data: err });
        }
    };

    /**
     * 음식점 정보 수정 API
     * @param {*} req
     * @param {*} res
     */
    updateRestaurant = async (req, res) => {
        const memberId = 4;
        const { restaurantId } = req.params;
        try {
            const updatedResult =
                await this.restaurantsService.updateRestaurant(
                    req.file,
                    req.body,
                    memberId,
                    restaurantId
                );

            res.status(createdResult.status).json(createdResult);
        } catch (err) {
            return res.status(err.status).json({ data: err });
        }
    };
}
