import { ReviewsRepository } from "../../repositories/reviews/reviews.repository";

export class ReviewsService {
    reviewsRepository = new ReviewsRepository();

    createReview = async (restaurantId, review, score) => {
        const createdReviews = await this.reviewsRepository.createReview(
            restaurantId,
            userId,
            review,
            score,
        );

        return {
            restaurantId: createdReviews.restaurantId,
            userId: createdReviews.userId,
            review: createdReviews.review,
            score: createdReviews.score,
            createdAt: createdReviews.createdAt,
            updatedAt: createdReviews.updatedAt,
        }
    };

    findAllReviews = async (restaurantId) => {
        const reviews = await this.reviewsRepository.findAllReviews(restaurantId);

        reviews.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        return reviews.map((review) => {
            return {
                id: review.id,
                restaurantId: review.restaurantId,
                userId: review.userId,
                review: review.review,
                score: review.score,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
            };
        });
    };

    findReviewById = async (reviewId) => {
        const review = await this.reviewsRepository.findReviewById(reviewId);

        return {
            id: review.id,
            retaurantId: review.restaurantId,
            userId: review.userId,
            review: review.review,
            score: review.score,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt
        }
    }

    updateReview = async (restaurantId, reviewId, review, score) => {
        const review = await this.reviewsRepository.findReviewById(reviewId);
        if (!review) throw new Error('존재하지 않는 리뷰입니다.');
        // if (review.userId !== userId) throw new Error('수정 권한이 없습니다.');

        await this.reviewsRepository.updateReview(restaurantId, reviewId, review, score)

        const updatedReview = await this.reviewsRepository.findReviewById(reviewId);

        return {
            restaurantId: updatedReview.restaurantId,
            userId: updatedReview.userId,
            reviewId: updatedReview.reviewId,
            review: updatedReview.review,
            score: updatedReview.score,
            createdAt: updatedReview.createdAt,
            updatedAt: updatedReview.updatedAt
        };
    };

    deleteReview = async (reviewId) => {
        const review = await this.ReviewsRepository.findReviewById(reviewId);
        if (!review) throw new Error('존재하지 않는 리뷰입니다.');

        await this.reviewsRepository.deleteReview(reviewId);

        return {
            reviewId: review.reviewId,
            restaurantId: review.restaurantId,
            userId: review.userId,
            review: review.review,
            score: review.score,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt
        }
    }
};