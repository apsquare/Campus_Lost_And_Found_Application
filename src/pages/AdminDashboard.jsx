import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchFilterBar from "../components/SearchFilterBar";
import ItemCard from "../components/ItemCard";
import { useApp } from "../context/AppContext";

export default function AdminDashboard() {
  const { items, leaderboard, studentScores } = useApp();

  const [activeTab, setActiveTab] = useState("All");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    rewardOnly: false,
    importantOnly: false,
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesTab = activeTab === "All" ? true : item.status === activeTab;

      const matchesSearch =
        item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = filters.category
        ? item.category === filters.category
        : true;

      const matchesLocation = filters.location
        ? item.location === filters.location
        : true;

      const matchesReward = filters.rewardOnly ? item.rewardOffered : true;
      const matchesImportant = filters.importantOnly ? item.important : true;

      return (
        matchesTab &&
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesReward &&
        matchesImportant
      );
    });
  }, [items, activeTab, filters]);

  const lostCount = items.filter((item) => item.status === "Lost").length;
  const foundCount = items.filter((item) => item.status === "Found").length;
  const resolvedCount = items.filter(
    (item) => item.status === "Resolved",
  ).length;

  return (
    <div className="page-shell">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="dashboard-main">
          <div className="welcome-card card">
            <h2>Welcome, Admin</h2>
            <p className="muted">
              Manage reports, resolve requests, and monitor student activity.
            </p>
          </div>

          <div className="dashboard-top-grid">
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Lost Items</h4>
                <p>{lostCount}</p>
              </div>

              <div className="stat-card">
                <h4>Found Items</h4>
                <p>{foundCount}</p>
              </div>

              <div className="stat-card">
                <h4>Resolved Items</h4>
                <p>{resolvedCount}</p>
              </div>
            </div>

            <div className="card leaderboard-card">
              <div className="leaderboard-header">
                <h3>🏆 Helper Leaderboard</h3>
                <p className="muted">
                  Students who helped return the most items
                </p>
              </div>

              {leaderboard.length > 0 ? (
                <div className="leaderboard-table">
                  <div className="leaderboard-table-header">
                    <span>Rank</span>
                    <span>Student</span>
                    <span>USN</span>
                    <span>Returns</span>
                    <span>Score</span>
                  </div>

                  {leaderboard.slice(0, 10).map((student, index) => (
                    <div className="leaderboard-table-row" key={student.usn}>
                      <span className="rank-badge">#{index + 1}</span>

                      <span className="student-name">{student.name}</span>

                      <span className="student-usn">{student.usn}</span>

                      <span>{student.successfulReturns}</span>

                      <span className="score-badge">{student.score} pts</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No helper activity yet.</p>
                </div>
              )}

              <div className="leaderboard-footer">
                <p className="muted">Total Students: {studentScores.length}</p>
              </div>
            </div>
          </div>

          <SearchFilterBar filters={filters} setFilters={setFilters} />

          <section className="items-section">
            <div className="section-header">
              <h2>{activeTab} Items</h2>
              <p className="muted">Browse and manage campus reports</p>
            </div>

            {filteredItems.length > 0 ? (
              <div className="items-grid">
                {filteredItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="empty-state card">
                <h3>No items found</h3>
                <p>Try changing your filters or add a new item report.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
