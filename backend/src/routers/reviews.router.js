import { Router } from "express";
import ReviewsController from "../controllers/reviews/reviews.controller"
import needSigninMiddleware from "../middleware/need-signin.middleware";

const router = Router();
const reviewsController = new ReviewsController

router.post(
    '/restaurants/:restaurantId/orders/:orderId/reviews',
    needSigninMiddleware,
    reviewsController.createReview
);

router.get(
    '/restaurant/:restaurantId/reviews',
    reviewsController.findAllReviews
);

router.get(
    '/restaurant/:restaurantId/reviews/:reviewId',
    reviewsController.findReviewById
);

router.put(
    '/restaurants/:restaurantId/reviews/:reviewId',
    needSigninMiddleware,
    reviewsController.updateReview
);

router.delete(
    '/restaurants/:restaurantId/reviews/:reviewId',
    needSigninMiddleware,
    reviewsController.deleteReview
)
export default router;