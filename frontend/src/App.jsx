import { useEffect, useState } from "react";
import AdminPortal from "./portals/AdminPortal";
import TeacherPortal from "./portals/TeacherPortal";
import UserPortal from "./portals/UserPortal";

const portals = [
  { id: "user", label: "User Portal" },
  { id: "teacher", label: "Teacher Portal" },
  { id: "admin", label: "Admin Portal" }
];

export default function App() {
  const [activePortal, setActivePortal] = useState("user");
  const [viewMode, setViewMode] = useState("darkBlue");

  useEffect(() => {
    document.body.setAttribute("data-theme", viewMode);
  }, [viewMode]);

  return (
    <main className="container">
      <header className="topbar">
        <h1>Test Server Portal</h1>
        <label className="mode-toggle">
          View Mode:
          <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
            <option value="darkBlue">Dark Blue</option>
            <option value="cream">White Cream</option>
          </select>
        </label>
      </header>
      <div className="tabs">
        {portals.map((portal) => (
          <button
            key={portal.id}
            className={activePortal === portal.id ? "active" : ""}
            onClick={() => setActivePortal(portal.id)}
            type="button"
          >
            {portal.label}
          </button>
        ))}
      </div>

      {activePortal === "user" ? <UserPortal /> : null}
      {activePortal === "teacher" ? <TeacherPortal /> : null}
      {activePortal === "admin" ? <AdminPortal /> : null}
    </main>
  );
}
