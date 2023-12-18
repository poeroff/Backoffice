import ReviewsService from '../../services/reviews/reviews.service'

export class ReviewsController {
    reviewsService = new ReviewsService();

    createReview = async (req, res) => {
        try {
            const memberId = res.locals.user;

            const createdReview = await this.reviewsService.createReview(
                memberId,
                req.params,
                req.body
            );

            return res.status(createdReview.status).json({ createdReview });
        } catch (err) {
            return res.status(err.status).json(err);
        };
    };

    getReviews = async (req, res) => {
        try {
            const getReviews = await this.reviewsService.getReviews(req.params);

            return res.status(getReviews.status).json(getReviews);
        } catch (err) {
            return res.status(err.status).json(err);
        };
    };

    getReview = async (req, res) => {
        try {
            const getReview = await this.reviewsService.getReview(req.params);

            return res.status(getReview.status).json(getReview);
        } catch (err) {
            return res.status(err.status).json(err)
        };
    };

    updateReview = async (req, res) => {
        const memberId = res.locals.user;
        try {
            const updatedReview = await this.reviewsService.updateReview(
                req.params,
                req.body,
                memberId
            )

            return res.status(updatedReview.status).json(updatedReview);
        } catch (err) {
            return res.status(err.status).json(err);
        };
    };

    deleteReview = async (req, res) => {
        const memberId = res.locals.user;
        try {
            const deletedReview = await this.reviewsService.deleteReview(
                req.params,
                memberId
            );

            return res.status(deletedReview.status).json(deletedReview);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    };
};
