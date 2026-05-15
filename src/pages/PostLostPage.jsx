import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useApp } from "../context/AppContext";

const categories = [
  "Accessories",
  "Electronics",
  "Books",
  "ID Card",
  "Keys",
  "Bottle",
  "Bag",
  "Clothing",
  "Documents",
  "Other",
];

export default function PostLostPage() {
  const { user, addLostItem } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    location: "",
    image: "",
    contact: user?.usn || "",
    important: false,
    rewardOffered: false,
    rewardText: "",
  });

  const [locationStatus, setLocationStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };

      reader.readAsDataURL(file);
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const useLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Live location is not supported on this device.");
      return;
    }

    setLocationStatus("Fetching live location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const liveLocation = `Live Location: https://www.google.com/maps?q=${latitude},${longitude}`;

        setForm((prev) => ({
          ...prev,
          location: liveLocation,
        }));

        setLocationStatus("Live location added successfully.");
      },
      () => {
        setLocationStatus(
          "Unable to access location. Please allow location permission.",
        );
      },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addLostItem(form);

    navigate("/dashboard");
  };

  return (
    <div className="page-shell">
      <Navbar />

      <main className="form-page">
        <div className="form-card">
          <h2>Report Lost Item</h2>

          <p className="muted">
            Add clear details so others can help you recover your item.
          </p>

          <form className="app-form" onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Item title"
              required
              value={form.title}
              onChange={handleChange}
            />

            <select
              name="category"
              required
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <textarea
              name="description"
              placeholder="Description"
              required
              value={form.description}
              onChange={handleChange}
            />

            <input
              name="date"
              type="date"
              required
              value={form.date}
              onChange={handleChange}
            />

            <div className="location-row">
              <input
                name="location"
                placeholder="Last seen location"
                required
                value={form.location}
                onChange={handleChange}
              />

              <button
                type="button"
                className="btn btn-outline"
                onClick={useLiveLocation}
              >
                Use Live Location
              </button>
            </div>

            {locationStatus && <p className="muted">{locationStatus}</p>}

            <label className="file-label">
              Upload Item Photo
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </label>

            {form.image && (
              <img className="preview-image" src={form.image} alt="Preview" />
            )}

            <input
              name="contact"
              placeholder="Contact details"
              required
              value={form.contact}
              onChange={handleChange}
            />

            <label className="check-inline">
              <input
                type="checkbox"
                name="important"
                checked={form.important}
                onChange={handleChange}
              />
              Mark as important
            </label>

            <label className="check-inline">
              <input
                type="checkbox"
                name="rewardOffered"
                checked={form.rewardOffered}
                onChange={handleChange}
              />
              Offer reward
            </label>

            {form.rewardOffered && (
              <div className="reward-input-wrapper">
                <span className="rupee-symbol">₹</span>

                <input
                  name="rewardText"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Enter reward amount"
                  value={form.rewardText}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button className="btn btn-primary" type="submit">
              Post Lost Item
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
