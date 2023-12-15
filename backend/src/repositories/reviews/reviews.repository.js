import prisma from "../../utiles/prisma/prisma"

export class ReviewsRepository {
    createReview = async (restaurantId, review, score) => {
        const createdReview = await prisma.reviews.create({
            data: {
                restaurantId,
                review,
                score,
            },
        });

        return createdReview;
    };

    findAllReviews = async (restaurantId) => {
        const reviews = await prisma.posts.findMany({
            where: { restaurantId: +restaurantId },
        })
        return reviews;
    };

    findReviewById = async (ReviewId) => {
        const review = await prisma.reviews.findUnique({
            where: { reviewId: +reviewId },
        })

        return review;
    }

    updateReview = async (restaurantId, review, score) => {
        const updatedReview = await prisma.reviews.update({
            where: { restaurantId: +restaurantId },
            data: {
                review,
                score
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