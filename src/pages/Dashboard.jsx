import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchFilterBar from "../components/SearchFilterBar";
import ItemCard from "../components/ItemCard";
import PointsCard from "../components/PointsCard";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { items, user } = useApp();

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

  const lostCount = items.filter((i) => i.status === "Lost").length;
  const foundCount = items.filter((i) => i.status === "Found").length;
  const resolvedCount = items.filter((i) => i.status === "Resolved").length;

  return (
    <div className="page-shell">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="dashboard-main">
          <div className="welcome-card card">
            <h2>Welcome, {user?.name}</h2>
            <p className="muted">USN: {user?.usn}</p>
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

            <PointsCard />
          </div>

          <SearchFilterBar filters={filters} setFilters={setFilters} />

          <section className="items-section">
            <div className="section-header">
              <h2>{activeTab} Items</h2>
              <p className="muted">Browse current campus reports</p>
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
