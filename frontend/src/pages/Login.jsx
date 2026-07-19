import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.email, res.data.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      setShake(true);
      setTimeout(() => setShake(false), 300);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
    className="min-h-screen flex items-center justify-center overflow-hidden page-atmosphere"
    style={{ background: "var(--bg-page)" }}
  >
    <div className="dot-grid" />

    <div
      className={`relative w-full max-w-md p-8 rounded-2xl overflow-hidden animate-fade-in-up ${
        shake ? "animate-shake" : ""
      }`}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div className="scan-line" />

      <h1
        className="text-2xl font-semibold mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        Welcome back
      </h1>

      <p
        className="text-sm mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        Log in to continue to ResumeIQ
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            className="text-sm block mb-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Email
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg outline-none"
            style={{
              background: "var(--bg-page)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
            }}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            className="text-sm block mb-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Password
          </label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg outline-none"
            style={{
              background: "var(--bg-page)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
            }}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-sm" style={{ color: "var(--danger)" }}>
            {error}
          </p>
        )}

        <div className="flex justify-end -mt-2">
          <Link
            to="/forgot-password"
            className="text-sm"
            style={{ color: "var(--accent)" }}
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg font-medium mt-2 flex items-center justify-center gap-2"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          {loading && (
            <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
          )}

          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p
        className="text-sm text-center mt-6"
        style={{ color: "var(--text-secondary)" }}
      >
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "var(--accent)" }}>
          Sign up
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;