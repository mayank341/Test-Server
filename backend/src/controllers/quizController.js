import { questions, quizzes } from "../data/mockDb.js";

export function listAvailableQuizzes(req, res) {
  res.json(
    quizzes.map((q) => ({
      id: q.id,
      title: q.title,
      durationMinutes: q.durationMinutes,
      totalQuestions: q.questionIds.length,
      negativeMarking: Boolean(q.negativeMarking)
    }))
  );
}

export function getQuizInstructions(req, res) {
  const quiz = quizzes.find((q) => q.id === req.params.quizId);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  return res.json({
    id: quiz.id,
    title: quiz.title,
    durationMinutes: quiz.durationMinutes,
    negativeMarking: Boolean(quiz.negativeMarking),
    instructions: quiz.instructions
  });
}

export function startQuiz(req, res) {
  const quiz = quizzes.find((q) => q.id === req.params.quizId);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  if (quiz.questionIds.length > 10) {
    return res.status(400).json({ message: "Quiz has more than 10 questions. Please contact admin." });
  }

  const selectedQuestions = questions
    .filter((q) => quiz.questionIds.includes(q.id))
    .map(({ correctAnswer, ...safeQuestion }) => safeQuestion);

  return res.json({
    quizId: quiz.id,
    title: quiz.title,
    durationMinutes: quiz.durationMinutes,
    negativeMarking: Boolean(quiz.negativeMarking),
    questions: selectedQuestions
  });
}

export function submitQuiz(req, res) {
  const { quizId, answers } = req.body;
  const quiz = quizzes.find((q) => q.id === quizId);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  const questionSet = questions.filter((q) => quiz.questionIds.includes(q.id));
  let score = 0;
  let total = 0;

  questionSet.forEach((q) => {
    total += q.marks;
    const given = answers?.[q.id];
    if (!given) return;

    if (given === q.correctAnswer) score += q.marks;
    else score -= q.negativeMarks || 0;
  });

  return res.json({
    quizId,
    obtained: Number(score.toFixed(2)),
    total,
    percentage: Number(((score / total) * 100).toFixed(2))
  });
}
