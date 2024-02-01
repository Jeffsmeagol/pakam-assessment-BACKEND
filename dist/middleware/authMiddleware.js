"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET_TOKEN || "change_your_jwt_secret";
function authMiddleware(req, res, next) {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const [bearer, token] = authorizationHeader.split(" ");
    if (bearer.toLowerCase() !== "bearer" || !token) {
        return res
            .status(401)
            .json({ message: "Invalid Authorization header format" });
    }
    // Check if jwtSecret is defined before using it
    if (jwtSecret !== undefined) {
        // Now, you can safely use jwtSecret without TypeScript complaining
        jsonwebtoken_1.default.verify(token, jwtSecret, (err, user) => {
            if (err)
                return res.status(403);
            req.user = user;
            next();
        });
    }
    else {
        console.error("JWT secret is undefined");
    }
}
exports.default = authMiddleware;
