const { User } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

const register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            message: "Register success",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        const token = await generateToken({
            id: user.id,
            isAdmin: user.isAdmin,
        });

        return res.status(200).json({
            message: "Login success",
            data: { token },
        });
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await User.findByPk(id, {
            attributes: {
                exclude: ["password"],
            },
        });

        res.status(200).json({
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = UserController = {
    register,
    login,
    get,
};
