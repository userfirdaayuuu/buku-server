const express = require("express");

const ReviewController = require("../controllers/ReviewController");
const { authMiddleware, reviewOwner } = require("../middlewares/auth");

const router = express.Router();

router.post(
    "/books/:bookId/reviews",
    authMiddleware,
    ReviewController.createReview
);

router.delete(
    "/books/:bookId/reviews/:reviewId",
    authMiddleware,
    reviewOwner,
    ReviewController.deleteReview
);

module.exports = router;
