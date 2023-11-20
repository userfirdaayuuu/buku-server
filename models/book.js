"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Book.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });

            Book.hasMany(models.Review, {
                foreignKey: "bookId",
                as: "reviews",
            });
        }
    }
    Book.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 255],
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [1, 10000],
                },
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 255],
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 255],
                },
            },
        },
        {
            sequelize,
            modelName: "Book",
        }
    );
    return Book;
};
