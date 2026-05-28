import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function LoginPage() {
  const [form, setForm] = useState({ loginId: "", password: "" });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const { login } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setError("Please accept the terms and conditions to continue.");
      return;
    }

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

          <div className="terms-box">
            <h3>Terms & Conditions</h3>
            <p>
              By using this Lost and Found application, users agree to follow
              the terms mentioned below.
            </p>

            <h4>1. User Responsibility</h4>
            <p>
              Users must provide true and correct information while posting a
              lost or found item. Users should not upload false details,
              misleading photos, fake claims, or offensive content.
            </p>

            <h4>2. User Conduct</h4>
            <p>
              Users must communicate respectfully and honestly. They must not
              threaten, abuse, harass, cheat, or mislead other users.
            </p>

            <h4>3. Unclaimed Items</h4>
            <p>
              If a found item is not claimed by its rightful owner within{" "}
              <strong>7 days</strong> from the date of posting, the finder must
              hand over the item to the admin.
            </p>
            <p>
              After the item is handed over to the admin or authorized
              authority, the finder will no longer be personally responsible for
              keeping the item.
            </p>
            <p>
              The application does not become the owner of any unclaimed item.
              The item will remain under the custody of the admin until it is
              claimed, disposed of, or handled according to the applicable
              rules.
            </p>

            <h4>4. Privacy and Data Use</h4>
            <p>
              The application may collect basic user information such as name,
              contact details, uploaded item details, photos, and claim
              information for the purpose of operating the Lost and Found
              service.
            </p>
            <p>
              User information will be used only for verification,
              communication, dispute handling, and safety purposes, unless
              disclosure is required by law or an authorized authority.
            </p>

            <h4>5. Limitation of Responsibility</h4>
            <p>
              The application is only a platform to help users report, search,
              claim, and return lost or found items. The application will not be
              responsible for false claims, delay in returning items, disputes
              between users, or misuse of any found item.
            </p>
            <p>
              By continuing to use the application, the user agrees to follow
              these Terms and Conditions.
            </p>
          </div>

          <label className="terms-accept">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => {
                setAcceptedTerms(e.target.checked);
                if (e.target.checked) setError("");
              }}
            />
            <span>I accept the terms and conditions.</span>
          </label>

          {error && <p className="error-text">{error}</p>}

          <button
            className="btn btn-primary full"
            type="submit"
            disabled={!acceptedTerms}
          >
            Login to Portal
          </button>
        </form>
      </div>
    </div>
  );
}
