import { v4 as uuid } from "uuid";
import { questions, quizzes } from "../data/mockDb.js";

export function getDashboardStats(req, res) {
  const subjects = new Set(questions.map((q) => q.subject.toLowerCase()));
  const theoryCount = questions.filter((q) => q.type.toLowerCase() === "theory").length;
  const codingCount = questions.filter((q) => q.type.toLowerCase() === "coding").length;

  res.json({
    totalQuizzes: quizzes.length,
    totalQuestions: questions.length,
    totalSubjects: subjects.size,
    theoryCount,
    codingCount
  });
}

export function listAllQuizzes(req, res) {
  res.json(quizzes);
}

export function createQuiz(req, res) {
  const {
    title,
    durationMinutes = 30,
    instructions = [],
    questionIds = [],
    negativeMarking = true
  } = req.body;

  if (!title || !Array.isArray(questionIds) || questionIds.length === 0) {
    return res.status(400).json({
      message: "title and at least one questionId are required"
    });
  }

  if (questionIds.length > 10) {
    return res.status(400).json({
      message: "A quiz can contain at most 10 questions"
    });
  }

  const allQuestionIds = new Set(questions.map((q) => q.id));
  const invalidQuestionId = questionIds.find((id) => !allQuestionIds.has(id));
  if (invalidQuestionId) {
    return res.status(400).json({
      message: `Invalid question id provided: ${invalidQuestionId}`
    });
  }

  const quiz = {
    id: uuid(),
    title,
    durationMinutes,
    instructions,
    questionIds,
    negativeMarking
  };

  quizzes.push(quiz);
  return res.status(201).json(quiz);
}
