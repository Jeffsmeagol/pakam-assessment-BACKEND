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
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, username, password } = req.body;
    try {
        // Check if the username already exists
        const existingUser = yield user_1.default.findOne({ username });
        if (existingUser) {
            return res.status(401).json({ message: "Username already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const userDetails = {
            firstname,
            lastname,
            username,
            password: hashedPassword,
        };
        const user = new user_1.default(userDetails);
        yield user.save();
        res.status(201).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(400).send("Error creating user");
    }
}));
exports.default = router;
