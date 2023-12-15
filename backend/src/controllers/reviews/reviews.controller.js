import ReviewsService from '../../services/reviews/reviews.service'

export class ReviewsController {
    reviewsService = new ReviewsService();

    createReview = async (restaurantId, review, score) => {
        try {
            const { restaurantId } = req.params;
            // const { userId } = req.headers;
            const { review, score } = req.body;

            const createdReview = await this.reviewsService.createReview(
                restaurantId,
                review,
                score
            );

            return res.status(201).json({
                message: "리뷰 작성에 성공했습니다.",
                data: createdReview
            });
        } catch (err) {
            console.log(err);
        };
    };

    findAllReviews = async (restaurantId) => {
        try {
            const { restaurantId } = req.params;

            const reviews = await this.reviewsService.findAllReviews(restaurantId);

            return res.status(200).json({
                message: "조회에 성공했습니다.",
                data: reviews
            });
        } catch (err) {
            console.log(err)
        };
    };

    findReviewById = async (reviewId) => {
        try {
            const { reviewId } = req.params;

            const review = await this.reviewsService.findReviewById(reviewId);

            return res.status(200).json({
                message: "조회에 성공했습니다.",
                data: review
            });
        } catch (err) {
            console.log(err)
        };
    };

    updateReview = async (restaurantId, reviewId, review, score) => {
        try {
            const { restaurantId, reviewId } = req.params;
            const { userId } = req.headers;
            const { review, score } = req.body;

            const updatedReview = await this.reviewsService.updateReview(
                restaurantId,
                reviewId,
                // userId,
                review,
                score
            )

            return res.status(201).json({
                message: "수정에 성공했습니다.",
                data: updatedReview
            });
        } catch (err) {
            console.log(err)
        };
    };

    deleteReview = async (reviewId) => {
        try {
            const { reviewId } = req.params;

            const deletedReview = await this.reviewsService.deleteReview(
                reviewId,
            )

            return res.status(200).json({
                message: '삭제를 성공했습니다.',
                data: deletedReview
            })
        } catch (err) {
            console.log(err)
        };
    };
};

