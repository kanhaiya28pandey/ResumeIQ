import { NavLink } from "react-router-dom";
import { LayoutDashboard, ScanLine, History, User, LogOut, } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/new-scan",
    label: "New Scan",
    icon: ScanLine,
  },
  {
    to: "/history",
    label: "History",
    icon: History,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
  },
];

function Sidebar() {
  const { logout } = useAuth();
  const handleLogout = () => {
    const confirmLogout = JSON.parse(
      localStorage.getItem("confirmLogout") ?? "true"
    );

    if (confirmLogout) {
      if (window.confirm("Logout from ResumeIQ?")) {
        logout();
      }
    } else {
      logout();
    }
  };
  return (
    <aside
      className="w-72 h-screen sticky top-0 flex flex-col px-5 py-6 animate-fade-in "
      style={{
        background: "var(--bg-card)",
        borderRight: "1px solid var(--border-subtle)",
      }}
    >
      {/* ================= Logo ================= */}

      <div
        className="pb-8 mb-8"
        style={{
          borderBottom: "1px solid rgba(255,255,255,.05)",
        }}
      >

        <h1
          className="text-3xl font-bold tracking-tight"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Resume
          <span
            style={{
              color: "var(--accent)",
            }}
          >
            IQ
          </span>
        </h1>

        <p
          className="mt-2 text-sm"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          AI Resume Analyzer
        </p>

      </div>

      {/* ================= Navigation ================= */}

      <nav className="flex flex-col gap-2">

        {navItems.map(
          ({
            to,
            label,
            icon: Icon,
          }) => (
            <NavLink
              key={to}
              to={to}
              className="group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 hover:translate-x-1 "
              style={({ isActive }) => ({
                background: isActive
                  ? "rgba(124,111,240,.12)"
                  : "transparent",

                color: isActive
                  ? "var(--accent)"
                  : "var(--text-secondary)",

                border: isActive
                  ? "1px solid rgba(124,111,240,.20)"
                  : "1px solid transparent",

                boxShadow: isActive
                  ? "inset 0 0 0 1px rgba(124,111,240,.18)"
                  : "none",
              })}
            >
              <Icon size={21} />

              <span className="font-medium text-base">
                {label}
              </span>

            </NavLink>
          )
        )}

      </nav>

      {/* ================= Footer ================= */}

      <div
        className="mt-auto pt-6"
        style={{
          borderTop: "1px solid var(--border-subtle)",
        }}
      >

        <button
          onClick={handleLogout}
          className=" group w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:translate-x-1 "
          style={{
            color: "var(--text-secondary)",
          }}
        >

          <LogOut
            size={20}
            className=" transition-colors duration-300 group-hover:text-red-500"
          />

          <span
            className=" font-medium transition-colors duration-300 group-hover:text-red-500"
          >
            Logout
          </span>
        </button>

        <div
          className="mt-6 pt-5"
          style={{
            borderTop: "1px solid rgba(255,255,255,.05)",
          }}
        >
          <p
            className="text-sm font-semibold"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            ResumeIQ
          </p>

          <p
            className="text-xs mt-1"
            style={{
              color: "var(--text-secondary)",
              opacity: .55,
              letterSpacing: ".5px",
            }}
          >
            Version 1.0.0
          </p>

        </div>

      </div>
    </aside>
  );
}

export default Sidebar;