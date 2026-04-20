import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function AdminPortal() {
  const [stats, setStats] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  async function loadData() {
    const [statsData, quizData] = await Promise.all([
      api("/admin/dashboard"),
      api("/admin/quizzes")
    ]);
    setStats(statsData);
    setQuizzes(quizData);
  }

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  if (!stats) return <p>Loading admin dashboard...</p>;

  return (
    <section className="card">
      <h2>Admin Portal</h2>
      <div className="grid">
        <Stat title="Total Quizzes" value={stats.totalQuizzes} />
        <Stat title="Total Questions" value={stats.totalQuestions} />
        <Stat title="Subjects" value={stats.totalSubjects} />
        <Stat title="Theory Questions" value={stats.theoryCount} />
        <Stat title="Coding Questions" value={stats.codingCount} />
      </div>

      <h3>Quiz List</h3>
      {quizzes.length === 0 ? (
        <p>No quizzes yet.</p>
      ) : (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              {quiz.title} ({quiz.durationMinutes} mins)
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Stat({ title, value }) {
  return (
    <div className="stat">
      <p>{title}</p>
      <strong>{value}</strong>
    </div>
  );
}
