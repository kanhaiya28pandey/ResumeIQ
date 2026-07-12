import { NavLink } from "react-router-dom";
import { LayoutDashboard, ScanLine, History, User } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/new-scan", label: "New Scan", icon: ScanLine },
  { to: "/history", label: "History", icon: History },
  { to: "/profile", label: "Profile", icon: User },
];

function Sidebar() {
  return (
    <div
      className="w-60 min-h-screen p-4 flex flex-col gap-1"
      style={{ background: "var(--bg-card)", borderRight: "1px solid var(--border-subtle)" }}
    >
      <div className="px-2 py-4 mb-2">
        <span className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
          Resume<span style={{ color: "var(--accent)" }}>IQ</span>
        </span>
      </div>

      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors`
          }
          style={({ isActive }) => ({
            background: isActive ? "rgba(124, 111, 240, 0.12)" : "transparent",
            color: isActive ? "var(--accent)" : "var(--text-secondary)",
          })}
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;