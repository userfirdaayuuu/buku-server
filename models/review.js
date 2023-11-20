"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Review.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });

            Review.belongsTo(models.Book, {
                foreignKey: "bookId",
                as: "book",
            });
        }
    }
    Review.init(
        {
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bookId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Review",
        }
    );
    return Review;
};
