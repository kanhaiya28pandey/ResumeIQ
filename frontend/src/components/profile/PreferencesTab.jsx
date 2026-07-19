import { Moon, Sun, Sparkles, LogOut, } from "lucide-react";

function SettingCard({icon: Icon, title, description, status, statusColor, children,}) {
  return (
    <div
      className="flex items-center justify-between rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: "var(--bg-page)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="p-3 rounded-xl"
          style={{
            background: "rgba(124,111,240,.12)",
          }}
        >
          <Icon
            size={20}
            style={{ color: "var(--accent)" }}
          />
        </div>

        <div>
          <h3
            className="font-semibold text-lg"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {title}
          </h3>

          <p
            className="text-sm mt-1"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {description}
          </p>

          <p
            className="text-xs mt-2 font-medium"
            style={{
              color: statusColor,
            }}
          >
            {status}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

function PreferencesTab({theme, toggleTheme, showSuggestions, setShowSuggestions, confirmLogout, setConfirmLogout, }) {
  return (
    <div className="min-h-[650px] flex flex-col gap-8">

      {/* ================= Appearance ================= */}

      <div>
        <h2
          className="text-lg font-semibold mb-4"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Appearance
        </h2>

        <SettingCard
          icon={theme === "dark" ? Moon : Sun}
          title="Theme"
          description="Choose your preferred application appearance."
          status={`Current Theme: ${theme === "dark" ? "Dark" : "Light"}`}
          statusColor="var(--accent)"
        >
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "var(--accent)",
              color: "#fff",
            }}
          >
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            {theme === "dark" ? "Dark" : "Light"}
          </button>
        </SettingCard>
      </div>

      {/* ================= AI Features ================= */}

      <div>
        <h2
          className="text-lg font-semibold mb-4"
          style={{
            color: "var(--text-primary)",
          }}
        >
          AI Features
        </h2>

        <SettingCard
          icon={Sparkles}
          title="Show AI Suggestions"
          description="Display AI improvement suggestions after every resume analysis."
          status={
            showSuggestions
              ? "Currently Enabled"
              : "Currently Disabled"
          }
          statusColor={
            showSuggestions
              ? "#22c55e"
              : "var(--text-secondary)"
          }
        >
          <button
            onClick={() => {
              const value = !showSuggestions;
              setShowSuggestions(value);
              localStorage.setItem(
                "showSuggestions",
                JSON.stringify(value)
              );
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: showSuggestions
                ? "#22c55e"
                : "#374151",
              color: "#fff",
            }}
          >
            <Sparkles size={16} />
            {showSuggestions ? "Enabled" : "Disabled"}
          </button>
        </SettingCard>

      </div>

      {/* ================= Security ================= */}

      <div>
        <h2
          className="text-lg font-semibold mb-4"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Security
        </h2>

        <SettingCard
          icon={LogOut}
          title="Confirm Logout"
          description="Ask for confirmation before signing out."
          status={
            confirmLogout
              ? "Currently Enabled"
              : "Currently Disabled"
          }
          statusColor={
            confirmLogout
              ? "#22c55e"
              : "var(--text-secondary)"
          }
        >
          <button
            onClick={() => {
              const value = !confirmLogout;
              setConfirmLogout(value);
              localStorage.setItem(
                "confirmLogout",
                JSON.stringify(value)
              );
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: confirmLogout
                ? "#22c55e"
                : "#374151",
              color: "#fff",
            }}
          >
            <LogOut size={16} />
            {confirmLogout ? "Enabled" : "Disabled"}
          </button>
        </SettingCard>
      </div>

      <div className="flex-1" />
    </div>
  );
}

export default PreferencesTab;