import { useEffect, useMemo, useState } from "react";
import { BarChart3, Settings, Shield, } from "lucide-react";
import api from "../api/axiosInstance";
import DashboardLayout from "../layouts/DashboardLayout";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import OverviewTab from "../components/profile/OverviewTab";
import PreferencesTab from "../components/profile/PreferencesTab";
import AccountTab from "../components/profile/AccountTab";
import ProfileFooter from "../components/profile/ProfileFooter";
import { useLocation } from "react-router-dom";

function Profile() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [activeTab, setActiveTab] = useState(
    location.state?.tab || "overview"
  );
  const [confirmLogout, setConfirmLogout] = useState(() => {
    const saved = localStorage.getItem("confirmLogout");
    return saved ? JSON.parse(saved) : true;
  });
  const [showSuggestions, setShowSuggestions] = useState(() => {
    const saved = localStorage.getItem("showSuggestions");
    return saved ? JSON.parse(saved) : true;
  });
  useEffect(() => {
    localStorage.setItem(
      "confirmLogout",
      JSON.stringify(confirmLogout)
    );
  }, [confirmLogout]);

  useEffect(() => {
    localStorage.setItem(
      "showSuggestions",
      JSON.stringify(showSuggestions)
    );
  }, [showSuggestions]);

  useEffect(() => {
    Promise.all([
      api.get("/auth/me"),
      api.get("/dashboard"),
    ])
      .then(([profileRes, dashboardRes]) => {
        setProfile(profileRes.data);
        setDashboard(dashboardRes.data);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  const handleLogout = () => {
    if (confirmLogout) {
      const ok = window.confirm("Logout from ResumeIQ?");
      if (!ok) return;
    }

    logout();
  };

  const tabs = useMemo(
    () => [
      {
        id: "overview",
        label: "Overview",
        icon: BarChart3,
      },
      {
        id: "preferences",
        label: "Preferences",
        icon: Settings,
      },
      {
        id: "account",
        label: "Account",
        icon: Shield,
      },
    ],
    []
  );

  if (!profile || !dashboard) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[70vh]">
          <div
            className="w-12 h-12 rounded-full border-4 animate-spin"
            style={{
              borderColor: "var(--accent)",
              borderTopColor: "transparent",
            }}
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-full">

        {/* ================= Right ================= */}

        <div className="h-full">

          <div
            className=" h-full rounded-[28px] overflow-hidden flex flex-col animate-fade-in "
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            {/* ================= Welcome ================= */}

            <div
              className="px-8 pt-8 pb-6"
              style={{
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <h1
                className="text-3xl font-bold"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                👋 Welcome back, {profile.name}
              </h1>

              <p
                className="mt-2"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Manage your ResumeIQ profile, preferences and account settings.
              </p>
            </div>
            {/* ================= Tabs ================= */}

            <div
              className=" flex items-center gap-3 px-8 py-5 "
              style={{
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >

              {tabs.map(({ id, label, icon: Icon }) => {

                const active = activeTab === id;

                return (

                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className=" group relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md "
                    style={{
                      background: active
                        ? "rgba(124,111,240,.12)"
                        : "transparent",

                      border: active
                        ? "1px solid rgba(124,111,240,.20)"
                        : "1px solid transparent",

                      color: active
                        ? "var(--accent)"
                        : "var(--text-secondary)",
                    }}
                  >

                    <Icon
                      size={18}
                      className=" transition-transform duration-300 group-hover:scale-110 "
                    />

                    <span
                      className={
                        active
                          ? "font-semibold"
                          : "font-medium"
                      }
                    >
                      {label}
                    </span>

                    {active && (

                      <span
                        className=" absolute left-4 right-4 bottom-1 h-[3px] rounded-full "
                        style={{
                          background: "var(--accent)",
                        }}
                      />

                    )}

                  </button>

                );

              })}

            </div>

            {/* ================= Content ================= */}

            <div
              className=" flex-1 overflow-auto px-8 py-8 "
            >
              <div
                key={activeTab}
                className=" h-full animate-fade-in transition-all duration-300 "
              >
                {activeTab === "overview" && (

                  <OverviewTab
                    profile={profile}
                    dashboard={dashboard}
                  />

                )}

                {activeTab === "preferences" && (

                  <PreferencesTab
                    theme={theme}
                    toggleTheme={toggleTheme}
                    showSuggestions={showSuggestions}
                    setShowSuggestions={setShowSuggestions}
                    confirmLogout={confirmLogout}
                    setConfirmLogout={setConfirmLogout}
                  />

                )}

                {activeTab === "account" && (

                  <AccountTab
                    profile={profile}
                    handleLogout={handleLogout}
                  />

                )}

              </div>

            </div>

            {/* ================= Footer ================= */}

            <div
              className="px-8 py-5"
              style={{
                borderTop: "1px solid var(--border-subtle)",
              }}
            >

              <ProfileFooter />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
export default Profile;