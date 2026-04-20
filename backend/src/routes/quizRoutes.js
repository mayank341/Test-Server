import { Router } from "express";
import {
  getQuizInstructions,
  listAvailableQuizzes,
  startQuiz,
  submitQuiz
} from "../controllers/quizController.js";

const router = Router();

router.get("/", listAvailableQuizzes);
router.get("/:quizId/instructions", getQuizInstructions);
router.post("/:quizId/start", startQuiz);
router.post("/submit", submitQuiz);

export default router;
