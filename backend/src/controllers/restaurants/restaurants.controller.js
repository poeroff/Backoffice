import RestaurantsService from '../../services/restaurants/restaurants.service.js';

export default class RestaurantsController {
    restaurantsService = new RestaurantsService();

    /**
     * 음식점 등록 API
     * @param {*} req
     * @param {*} res
     */
    createRestaurant = async (req, res) => {
        const memberId = res.locals.user;
        console.log("hllo")
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
        const memberId = res.locals.user;
        const { restaurantId } = req.params;
       
        try {
            const updatedResult =
                await this.restaurantsService.updateRestaurant(
                    req.file,
                    req.body,
                    memberId,
                    restaurantId
                );

            res.status(updatedResult.status).json(updatedResult);
        } catch (err) {
            return res.status(err.status).json({ data: err });
        }
    };

    /**
     * 음식점 삭제 API
     * @param {*} req
     * @param {*} res
     */
    deleteRestaurant = async (req, res) => {
        const memberId = res.locals.user;
      

        try {
            const deleteResult = await this.restaurantsService.deleteRestaurant(
                req.params,
                memberId
            );

            res.status(deleteResult.status).json(deleteResult);
        } catch (err) {
            return res.status(err.status).json({ data: err });
        }
    };
}
