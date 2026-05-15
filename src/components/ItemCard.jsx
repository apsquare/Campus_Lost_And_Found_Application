import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.title} className="item-image" />

      <div className="item-content">
        <div className="item-top">
          <h3>{item.title}</h3>
          <span className={`badge status-${item.status.toLowerCase()}`}>
            {item.status}
          </span>
        </div>

        <p className="muted">
          <strong>Category:</strong> {item.category}
        </p>
        <p className="muted">
          <strong>Date:</strong> {item.date}
        </p>
        <p className="muted">
          <strong>Location:</strong> {item.location}
        </p>

        <p className="desc">
          {item.description.length > 100
            ? item.description.slice(0, 100) + "..."
            : item.description}
        </p>

        <div className="item-badges">
          {item.rewardOffered && (
            <span className="badge reward">Reward: {item.rewardText}</span>
          )}
          {item.important && <span className="badge important">Important</span>}
        </div>

        <Link className="btn btn-primary full" to={`/item/${item.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}
