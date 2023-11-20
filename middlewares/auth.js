const jwt = require("jsonwebtoken");
const { User, Review } = require("../models");

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(401)
            .json({
                errors: {
                    message: "Unauthorized",
                },
            })
            .end();
    } else {
        jwt.verify(token, "jwtsecret", async (err, decoded) => {
            if (err) {
                res.status(401)
                    .json({
                        errors: {
                            message: "Unauthorized",
                        },
                    })
                    .end();
            } else {
                const user = await User.findOne({
                    where: {
                        id: decoded.id,
                    },
                    attributes: {
                        exclude: ["password"],
                    },
                });

                if (!user) {
                    res.status(401)
                        .json({
                            errors: {
                                message: "Unauthorized",
                            },
                        })
                        .end();
                } else {
                    req.user = user;
                    next();
                }
            }
        });
    }
};

const adminMiddleware = async (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(403)
            .json({
                errors: {
                    message: "Forbidden",
                },
            })
            .end();
    }
};

const reviewOwner = async (req, res, next) => {
    const user = req.user;
    const reviewId = req.params.reviewId;

    const review = await Review.findOne({
        where: {
            id: reviewId,
        },
    });

    if (!review) {
        res.status(404)
            .json({
                errors: {
                    message: "Review not found",
                },
            })
            .end();
    } else {
        if (user.id === review.userId) {
            next();
        } else {
            res.status(401)
                .json({
                    errors: {
                        message: "Unauthorized",
                    },
                })
                .end();
        }
    }
};

module.exports = {
    authMiddleware,
    adminMiddleware,
    reviewOwner,
};
