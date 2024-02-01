"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
const jwtSecret = process.env.JWT_SECRET_TOKEN || "change_your_jwt_secret";
if (!jwtSecret) {
    console.error("JWT secret is missing. Please check your environment variables.");
    process.exit(1);
}
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Find the user by username
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid Username" });
        }
        // Compare the provided password with the stored hashed password
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(402).json({ message: "Invalid password credentials" });
        }
        // Generate a JWT token for authentication
        const token = jsonwebtoken_1.default.sign({ username }, jwtSecret);
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
console.log(process.env.JWT_SECRET_TOKEN);
exports.default = router;
