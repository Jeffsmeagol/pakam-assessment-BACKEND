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
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const assessmentRoute_1 = __importDefault(require("./routes/assessmentRoute"));
const signupRoute_1 = __importDefault(require("./routes/signupRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI ||
    "mongodb+srv://adebowalejeff:M6VsLsqiOddr3gmf@cluster0.kemjulm.mongodb.net/pakam?retryWrites=true&w=majority";
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.set("strictQuery", false);
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield mongoose_1.default.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
app.use("/signup", signupRoute_1.default);
app.use("/login", loginRoute_1.default);
app.use("/assessments", authMiddleware_1.default, assessmentRoute_1.default);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`, "listening for requests");
    });
});
