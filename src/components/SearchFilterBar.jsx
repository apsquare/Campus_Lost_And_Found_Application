export default function SearchFilterBar({ filters, setFilters }) {
  return (
    <div className="filter-bar card">
      <input
        type="text"
        placeholder="Search by title or keyword..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">All Categories</option>
        <option value="Accessories">Accessories</option>
        <option value="Electronics">Electronics</option>
        <option value="Personal Items">Personal Items</option>
        <option value="Documents">Documents</option>
      </select>

      <select
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      >
        <option value="">All Locations</option>
        <option value="Library 2nd Floor">Library 2nd Floor</option>
        <option value="Sports Complex">Sports Complex</option>
        <option value="Room B-204">Room B-204</option>
      </select>

      <label className="check-inline">
        <input
          type="checkbox"
          checked={filters.rewardOnly}
          onChange={(e) =>
            setFilters({ ...filters, rewardOnly: e.target.checked })
          }
        />
        Reward only
      </label>

      <label className="check-inline">
        <input
          type="checkbox"
          checked={filters.importantOnly}
          onChange={(e) =>
            setFilters({ ...filters, importantOnly: e.target.checked })
          }
        />
        Important only
      </label>
    </div>
  );
}
