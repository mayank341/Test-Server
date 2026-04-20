import { Router } from "express";
import { addQuestion, getQuestions, updateQuestion } from "../controllers/teacherController.js";

const router = Router();

router.get("/questions", getQuestions);
router.post("/questions", addQuestion);
router.put("/questions/:id", updateQuestion);

export default router;
