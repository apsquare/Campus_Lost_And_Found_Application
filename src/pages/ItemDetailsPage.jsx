import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import { useApp } from "../context/AppContext";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { items, markResolved, completePayment, user } = useApp();

  const item = useMemo(() => items.find((i) => i.id === id), [items, id]);

  if (!item) {
    return (
      <div className="page-shell">
        <Navbar />

        <main className="form-page">
          <div className="form-card">
            <h2>Item not found</h2>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  const isOwner =
    user?.usn === item.contact || user?.name === item.reporterName;

  const canResolve =
    item.status !== "Resolved" &&
    isOwner &&
    (!item.rewardOffered || item.rewardPaid);

  return (
    <div className="page-shell">
      <Navbar />

      <main className="details-page">
        <div className="details-grid">
          <div className="details-card card">
            <img src={item.image} alt={item.title} className="details-image" />

            <div className="details-info">
              <div className="item-top">
                <h2>{item.title}</h2>

                <span className={`badge status-${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>

              <p>
                <strong>Category:</strong> {item.category}
              </p>

              <p>
                <strong>Date Reported:</strong> {item.date}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {item.location.startsWith("Live Location") ? (
                  <a
                    href={item.location.replace("Live Location: ", "")}
                    target="_blank"
                    rel="noreferrer"
                    className="live-location-link"
                  >
                    Open Live Location
                  </a>
                ) : (
                  item.location
                )}
              </p>

              <p>
                <strong>Reporter:</strong> {item.reporterName}
              </p>

              <p>
                <strong>Contact:</strong> {item.contact}
              </p>

              <p>
                <strong>Description:</strong> {item.description}
              </p>

              <div className="item-badges">
                {item.rewardOffered && (
                  <span className="badge reward">
                    Reward: {item.rewardText}
                  </span>
                )}

                {item.important && (
                  <span className="badge important">Urgent</span>
                )}
              </div>

              {item.rewardOffered && item.status !== "Resolved" && (
                <div className="payment-box">
                  <h3>Pseudo Payment</h3>

                  <p>
                    This request can only be resolved after payment completion.
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {item.rewardPaid ? "Payment Completed" : "Payment Pending"}
                  </p>

                  {!item.rewardPaid && isOwner && (
                    <button
                      className="btn btn-outline"
                      onClick={() => completePayment(item.id)}
                    >
                      Complete Pseudo Payment
                    </button>
                  )}
                </div>
              )}

              {canResolve && (
                <button
                  className="btn btn-primary"
                  onClick={() => markResolved(item.id)}
                >
                  Mark as Resolved
                </button>
              )}

              {!isOwner && item.status !== "Resolved" && (
                <p className="owner-note">
                  Only the person who posted this request can mark it as
                  resolved.
                </p>
              )}
            </div>
          </div>

          <ChatBox item={item} />
        </div>
      </main>
    </div>
  );
}
