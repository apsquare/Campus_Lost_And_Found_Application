export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = ["All", "Lost", "Found", "Resolved"];

  return (
    <aside className="sidebar">
      <h3>Browse Sections</h3>
      <div className="sidebar-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`sidebar-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Items
          </button>
        ))}
      </div>
    </aside>
  );
}
