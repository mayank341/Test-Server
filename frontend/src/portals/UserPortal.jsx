import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";

export default function UserPortal() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState("");
  const [instructions, setInstructions] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    api("/quizzes").then(setQuizzes).catch(console.error);
  }, []);

  async function viewInstructions() {
    if (!selectedQuizId) return;
    const data = await api(`/quizzes/${selectedQuizId}/instructions`);
    setInstructions(data);
    setAttempt(null);
    setResult(null);
    setAnswers({});
    setCurrentIndex(0);
  }

  async function startQuiz() {
    const data = await api(`/quizzes/${selectedQuizId}/start`, { method: "POST" });
    setAttempt(data);
    setResult(null);
    setCurrentIndex(0);
    setAnswers({});
  }

  async function submitQuiz() {
    const payload = {
      quizId: selectedQuizId,
      answers
    };
    const data = await api("/quizzes/submit", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    setResult(data);
  }

  const activeQuestion = useMemo(() => {
    if (!attempt?.questions?.length) return null;
    return attempt.questions[currentIndex];
  }, [attempt, currentIndex]);

  return (
    <section className="card">
      <h2>User Portal</h2>
      <p>Choose quiz and click start.</p>

      <div className="row">
        <select value={selectedQuizId} onChange={(e) => setSelectedQuizId(e.target.value)}>
          <option value="">Select Quiz</option>
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.title} ({quiz.totalQuestions} questions)
            </option>
          ))}
        </select>
        <button type="button" onClick={viewInstructions} disabled={!selectedQuizId}>
          View Instructions
        </button>
      </div>

      {instructions ? (
        <div className="instructions">
          <h3>{instructions.title} - Instructions</h3>
          <ul>
            {instructions.instructions.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
          <p>
            Duration: {instructions.durationMinutes} minutes | Negative Marking:{" "}
            {instructions.negativeMarking ? "Yes" : "No"}
          </p>
          <button onClick={startQuiz} type="button">
            Start Quiz
          </button>
        </div>
      ) : null}

      {attempt && activeQuestion ? (
        <div className="quiz">
          <h3>
            Question {currentIndex + 1}/{attempt.questions.length}
          </h3>
          <p className="meta-line">
            Subject: {activeQuestion.subject} | Type: {activeQuestion.type} | Marks: {activeQuestion.marks}
          </p>
          <p>{activeQuestion.questionText}</p>

          {activeQuestion.options?.length ? (
            <div className="options">
              {activeQuestion.options.map((opt) => (
                <label key={opt} className="option">
                  <input
                    type="radio"
                    name={activeQuestion.id}
                    checked={answers[activeQuestion.id] === opt}
                    onChange={() => setAnswers((old) => ({ ...old, [activeQuestion.id]: opt }))}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : (
            <textarea
              placeholder="Write your answer here"
              value={answers[activeQuestion.id] || ""}
              onChange={(e) =>
                setAnswers((old) => ({
                  ...old,
                  [activeQuestion.id]: e.target.value
                }))
              }
            />
          )}

          <div className="row">
            <button type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((i) => i - 1)}>
              Prev
            </button>
            {currentIndex < attempt.questions.length - 1 ? (
              <button type="button" onClick={() => setCurrentIndex((i) => i + 1)}>
                Next
              </button>
            ) : (
              <button type="button" className="submit-btn" onClick={submitQuiz}>
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      ) : null}

      {result ? (
        <div className="result">
          <h3>Result</h3>
          <p>
            Score: {result.obtained} / {result.total}
          </p>
          <p>Percentage: {result.percentage}%</p>
        </div>
      ) : null}
    </section>
  );
}
