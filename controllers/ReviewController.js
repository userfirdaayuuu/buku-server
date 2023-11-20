const { Review, Book } = require("../models");

const createReview = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.bookId);

        if (!book) {
            throw new ResponseError(404, "Book not found");
        }

        const review = await Review.create({
            ...req.body,
            userId: req.user.id,
            bookId: req.params.bookId,
        });

        res.status(201).json({
            message: "Review created successfully",
            data: review,
        });
    } catch (error) {
        next(error);
    }
};

const deleteReview = async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        await Review.destroy({
            where: {
                id: reviewId,
            },
        });

        res.status(200).json({
            message: "Review deleted",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createReview,
    deleteReview,
};
