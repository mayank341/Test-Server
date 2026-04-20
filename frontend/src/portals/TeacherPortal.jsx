import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";

const initialForm = {
  subject: "",
  topic: "",
  type: "quiz",
  difficulty: "easy",
  questionText: "",
  options: "",
  correctAnswer: "",
  marks: 1,
  negativeMarks: 0
};

const subjectOptions = ["Java", "Python", "DSA", "Aptitude", "React", "Frontend", "Backend"];

export default function TeacherPortal() {
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({ subject: "", type: "" });
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");

  async function loadQuestions() {
    const query = new URLSearchParams();
    if (filters.subject) query.set("subject", filters.subject);
    if (filters.type) query.set("type", filters.type);
    const data = await api(`/teacher/questions?${query.toString()}`);
    setQuestions(data);
  }

  useEffect(() => {
    loadQuestions().catch(console.error);
  }, [filters.subject, filters.type]);

  const subjects = useMemo(() => {
    const unique = new Set(questions.map((q) => q.subject));
    return [...unique];
  }, [questions]);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      options: form.options
        ? form.options.split(",").map((opt) => opt.trim()).filter(Boolean)
        : [],
      marks: Number(form.marks),
      negativeMarks: Number(form.negativeMarks)
    };

    if (editingId) {
      await api(`/teacher/questions/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(payload)
      });
    } else {
      await api("/teacher/questions", {
        method: "POST",
        body: JSON.stringify(payload)
      });
    }

    setForm(initialForm);
    setEditingId("");
    await loadQuestions();
  }

  function startEdit(question) {
    setEditingId(question.id);
    setForm({
      subject: question.subject,
      topic: question.topic,
      type: question.type,
      difficulty: question.difficulty,
      questionText: question.questionText,
      options: (question.options || []).join(", "),
      correctAnswer: question.correctAnswer,
      marks: question.marks,
      negativeMarks: question.negativeMarks
    });
  }

  return (
    <section className="card">
      <h2>Teacher Portal</h2>

      <div className="filters">
        <label>
          Subject:
          <input
            value={filters.subject}
            onChange={(e) => setFilters((old) => ({ ...old, subject: e.target.value }))}
            placeholder="e.g. JavaScript"
          />
        </label>
        <label>
          Type:
          <select
            value={filters.type}
            onChange={(e) => setFilters((old) => ({ ...old, type: e.target.value }))}
          >
            <option value="">All</option>
            <option value="quiz">Quiz</option>
            <option value="theory">Theory</option>
            <option value="coding">Coding</option>
          </select>
        </label>
      </div>

      <h3>{editingId ? "Edit Question" : "Add Question"}</h3>
      <form className="form-grid" onSubmit={handleSubmit}>
        <input
          list="subject-options"
          required
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm((old) => ({ ...old, subject: e.target.value }))}
        />
        <datalist id="subject-options">
          {subjectOptions.map((subject) => (
            <option key={subject} value={subject} />
          ))}
        </datalist>
        <input
          placeholder="Topic"
          value={form.topic}
          onChange={(e) => setForm((old) => ({ ...old, topic: e.target.value }))}
        />
        <select value={form.type} onChange={(e) => setForm((old) => ({ ...old, type: e.target.value }))}>
          <option value="quiz">Quiz</option>
          <option value="theory">Theory</option>
          <option value="coding">Coding</option>
        </select>
        <select
          value={form.difficulty}
          onChange={(e) => setForm((old) => ({ ...old, difficulty: e.target.value }))}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <textarea
          required
          placeholder="Question text"
          value={form.questionText}
          onChange={(e) => setForm((old) => ({ ...old, questionText: e.target.value }))}
        />
        <input
          placeholder="Options (comma separated)"
          value={form.options}
          onChange={(e) => setForm((old) => ({ ...old, options: e.target.value }))}
        />
        <input
          placeholder="Correct answer"
          value={form.correctAnswer}
          onChange={(e) => setForm((old) => ({ ...old, correctAnswer: e.target.value }))}
        />
        <input
          type="number"
          min="1"
          placeholder="Marks"
          value={form.marks}
          onChange={(e) => setForm((old) => ({ ...old, marks: e.target.value }))}
        />
        <input
          type="number"
          step="0.25"
          min="0"
          placeholder="Negative marks"
          value={form.negativeMarks}
          onChange={(e) => setForm((old) => ({ ...old, negativeMarks: e.target.value }))}
        />
        <button type="submit">{editingId ? "Update Question" : "Add Question"}</button>
      </form>

      <h3>Question Bank ({questions.length})</h3>
      <p>Detected subjects: {subjects.length ? subjects.join(", ") : "None"}</p>
      <ul className="question-list">
        {questions.map((q) => (
          <li key={q.id}>
            <strong>{q.subject}</strong> | {q.type} | {q.questionText}
            <button onClick={() => startEdit(q)} type="button">
              Edit
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
