import { Router } from "express";
import { createQuiz, getDashboardStats, listAllQuizzes } from "../controllers/adminController.js";

const router = Router();

router.get("/dashboard", getDashboardStats);
router.get("/quizzes", listAllQuizzes);
router.post("/quizzes", createQuiz);

export default router;
