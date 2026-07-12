import { useEffect, useState } from "react";
import { Sun, Moon, LogOut } from "lucide-react";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Profile() {
  const [createdAt, setCreatedAt] = useState(null);
  const { email, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    api.get("/auth/me").then((res) => setCreatedAt(res.data.createdAt));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden page-atmosphere" style={{ background: "var(--bg-page)" }}>
      <div className="dot-grid" />

      <div
        className="relative w-full max-w-md p-8 rounded-2xl animate-fade-in-up"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
      >
        <h1 className="text-2xl font-semibold mb-6" style={{ color: "var(--text-primary)" }}>
          Profile
        </h1>

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Email</p>
            <p style={{ color: "var(--text-primary)" }}>{email}</p>
          </div>

          {createdAt && (
            <div>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Member since</p>
              <p style={{ color: "var(--text-primary)" }}>
                {new Date(createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          )}
        </div>

        <div
          className="flex items-center justify-between p-3 rounded-lg mb-4"
          style={{ background: "var(--bg-page)", border: "1px solid var(--border-subtle)" }}
        >
          <span className="text-sm" style={{ color: "var(--text-primary)" }}>Theme</span>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
            {theme === "dark" ? "Dark" : "Light"}
          </button>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium"
          style={{ background: "transparent", border: "1px solid var(--danger)", color: "var(--danger)" }}
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </div>
  );
}

export default Profile;