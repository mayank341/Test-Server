import { v4 as uuid } from "uuid";
import { questions } from "../data/mockDb.js";

export function getQuestions(req, res) {
  const { subject, type } = req.query;

  const filtered = questions.filter((q) => {
    const subjectMatch = subject ? q.subject.toLowerCase() === subject.toLowerCase() : true;
    const typeMatch = type ? q.type.toLowerCase() === type.toLowerCase() : true;
    return subjectMatch && typeMatch;
  });

  res.json(filtered);
}

export function addQuestion(req, res) {
  const {
    subject,
    topic,
    type = "quiz",
    difficulty = "easy",
    questionText,
    options = [],
    correctAnswer = "",
    marks = 1,
    negativeMarks = 0
  } = req.body;

  if (!subject || !questionText) {
    return res.status(400).json({ message: "subject and questionText are required" });
  }

  const question = {
    id: uuid(),
    subject,
    topic: topic || "",
    type,
    difficulty,
    questionText,
    options,
    correctAnswer,
    marks,
    negativeMarks
  };

  questions.push(question);
  return res.status(201).json(question);
}

export function updateQuestion(req, res) {
  const { id } = req.params;
  const index = questions.findIndex((q) => q.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Question not found" });
  }

  questions[index] = { ...questions[index], ...req.body };
  return res.json(questions[index]);
}
