const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.substring(7);
    if (!token || token == null) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decoded) {
            req.user = decoded
            return next();
        }
        else {
            return res.status(401).send("Invalid Token");
        }
    }
    catch {
        return res.status(403).send("Token error");
    }
};

module.exports = verifyToken;