import { Router } from "express";
import ReviewsController from "../controllers/reviews/reviews.controller"

const router = Router();
const reviewsController = new ReviewsController

router.post(
    '/restaurants/:restaurantId/reviews',
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
    reviewsController.updateReview
);
export default router;