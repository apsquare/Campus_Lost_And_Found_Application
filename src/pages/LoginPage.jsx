import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function LoginPage() {
  const [form, setForm] = useState({ loginId: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.loginId.trim()) {
      setError("Please enter your USN or admin username.");
      return;
    }

    const result = login(form);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setError("");
    navigate(result.role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card professional-login">
        <div className="login-brand">
          <h1>Campus Lost & Found</h1>
          <h2>Sir M Visvesvaraya Institute of Technology</h2>
          <p>
            Secure student recovery portal for reporting and returning lost
            items.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>USN / Admin Username</label>
            <input
              name="loginId"
              type="text"
              placeholder="Example: 1MV25XXXXX"
              value={form.loginId}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Only required for admin"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="btn btn-primary full" type="submit">
            Login to Portal
          </button>
        </form>
      </div>
    </div>
  );
}
