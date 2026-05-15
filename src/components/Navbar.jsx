import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const {
    user,
    logout,
    notifications,
    markNotificationsRead,
    theme,
    toggleTheme,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
    markNotificationsRead();
  };

  return (
    <header className="navbar">
      <div>
        <h1 className="brand">Campus Lost & Found</h1>
        <p className="brand-subtitle">
          Sir M Visvesvaraya Institute of Technology
        </p>
      </div>

      <nav className="nav-links">
        {user?.role === "admin" ? (
          <Link to="/admin">Admin</Link>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/post-lost">Post Lost</Link>
            <Link to="/post-found">Post Found</Link>
          </>
        )}
      </nav>

      <div className="nav-user">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>

        <div className="notification-wrapper">
          <button
            className="notification-btn"
            onClick={handleNotificationClick}
          >
            🔔
            {unreadCount > 0 && (
              <span className="notification-count">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-dropdown-header">
                <h4>Notifications</h4>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                >
                  ×
                </button>
              </div>

              {notifications.length > 0 ? (
                notifications.slice(0, 6).map((n) => (
                  <div key={n.id} className="notification-item">
                    <p>{n.message}</p>
                    <small>{n.time}</small>
                  </div>
                ))
              ) : (
                <p className="muted">No notifications yet.</p>
              )}
            </div>
          )}
        </div>

        <span className="user-label">
          {user?.role === "admin" ? "Admin" : user?.name}
        </span>

        <button className="btn btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
