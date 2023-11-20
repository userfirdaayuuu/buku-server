const jwt = require("jsonwebtoken");

const generateToken = async (payload) => {
    return jwt.sign(payload, "jwtsecret", { expiresIn: "1d" });
};

module.exports = {
    generateToken,
};
