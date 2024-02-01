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
const assessment_1 = __importDefault(require("../models/assessment"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assessments = yield assessment_1.default.find({ username: req.user.username }, { __v: 0, username: 0 });
        res.json(assessments);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving users");
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assessment = new assessment_1.default(Object.assign(Object.assign({}, req.body), { username: req.user.username }));
        yield assessment.save();
        res.status(201).json(assessment);
    }
    catch (err) {
        console.error(err);
        res.status(400).send("Error creating assessment");
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, quantity } = req.body;
    try {
        const updatedAssessment = yield assessment_1.default.findByIdAndUpdate(id, { username: req.user.username, name, description, quantity }, { new: true });
        if (!updatedAssessment) {
            return res.status(404).json({ error: "Assessment not found" });
        }
        res.json(updatedAssessment);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedAssessment = yield assessment_1.default.findByIdAndDelete(id);
        if (!deletedAssessment) {
            return res.status(404).json({ error: "Assessment not found" });
        }
        res.json(deletedAssessment);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
