"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Book, {
                foreignKey: "userId",
                as: "books",
            });

            User.hasMany(models.Review, {
                foreignKey: "userId",
                as: "reviews",
            });
        }
    }
    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 255],
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [8, 20],
                },
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                beforeCreate: async (user, options) => {
                    user.password = await bcrypt.hash(user.password, 10);
                },
            },
        }
    );
    return User;
};
