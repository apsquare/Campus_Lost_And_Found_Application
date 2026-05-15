import { useApp } from "../context/AppContext";

export default function PointsCard() {
  const { currentUserData } = useApp();

  const badge =
    currentUserData.points >= 30
      ? "Gold Helper"
      : currentUserData.points >= 15
        ? "Silver Helper"
        : "Helpful Member";

  return (
    <div className="points-card">
      <h3>My Contribution</h3>
      <div className="points-number">{currentUserData.points}</div>
      <p>Total Points</p>
      <div className="points-meta">
        <span>Successful Returns: {currentUserData.successfulReturns}</span>
        <span className="badge reward">{badge}</span>
      </div>
    </div>
  );
}
