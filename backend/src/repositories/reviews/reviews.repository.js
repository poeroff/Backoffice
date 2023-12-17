import prisma from "../../utiles/prisma/prisma"

export default class ReviewsRepository {
    createReview = async newReviewObj => {
        const createdReview = await prisma.reviews.create({
            data: {
                ...newReviewObj,
            },
        });

        return createdReview;
    };

    getReviews = async restaurantId => {
        const getReviews = await prisma.posts.findMany({
            where: { restaurantId: +restaurantId },
        })
        return getReviews;
    };

    getReview = async reviewId => {
        const selecOneReview = await prisma.reviews.findUnique({
            where: { reviewId: +reviewId },
        })

        return selecOneReview;
    }

    updateReview = async (reviewId, updateReviewObj) => {
        const updatedReview = await prisma.reviews.update({
            where: { reviewId: +reviewId },
            data: {
                ...updateReviewObj,
            },
        });

        return updatedReview;
    };

    deleteReview = async (reviewId) => {
        const deletedReview = await prisma.reviews.delete({
            where: { reviewId: +reviewId }
        });

        return deletedReview;
    }
}