import RestaurantsService from '../../services/restaurants/restaurants.service.js';

export default class RestaurantsController {
    restaurantsService = new RestaurantsService();

    /**
     * 음식점 등록 API
     * @param {*} req
     * @param {*} res
     */
    createRestaurant = async (req, res) => {
        const file = req.file;

        const createdResult = await this.restaurantsService.createRestaurant();
        res.json({ 테스트: '테스트' });
    };
}
