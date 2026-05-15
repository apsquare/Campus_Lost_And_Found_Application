import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PostLostPage from "./pages/PostLostPage";
import PostFoundPage from "./pages/PostFoundPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/post-lost"
        element={
          <ProtectedRoute allowedRole="student">
            <PostLostPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/post-found"
        element={
          <ProtectedRoute allowedRole="student">
            <PostFoundPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/item/:id"
        element={
          <ProtectedRoute allowedRole="student">
            <ItemDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
