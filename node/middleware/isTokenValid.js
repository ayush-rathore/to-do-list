const JWT = require("jsonwebtoken");

exports.isTokenValid = (req, res, next) => {
    try {
        if (!req.headers.token) {
            console.error("No token was sent");
            return res.status(403).send("Invalid Token");
        }
        const token = JWT.verify(req.headers.token, "to-do-list");
        if (token.email === req.headers.email) {
            return next();
        }
        console.warn("User sent suspicious token");
        return res.status(417).send("Send a valid token");
    } catch (error) {
        console.error("Token validation failed");
        return res.status(401).send("Token validation failed");
    }
};
