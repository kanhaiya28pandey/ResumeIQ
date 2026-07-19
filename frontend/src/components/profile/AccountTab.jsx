import { Lock, LogOut, Trash2, ChevronRight, } from "lucide-react";
import api from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function AccountCard({
  icon,
  title,
  description,
  danger = false,
  onClick,
}) {
  const Icon = icon;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl "
      style={{
        background: danger
          ? "rgba(239,68,68,.06)"
          : "var(--bg-page)",
        border: danger
          ? "1px solid rgba(239,68,68,.25)"
          : "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: danger
              ? "rgba(239,68,68,.15)"
              : "rgba(124,111,240,.15)",
          }}
        >
          <Icon
            size={22}
            color={danger ? "#ef4444" : "#7C6FF0"}
          />
        </div>

        <div className="text-left">
          <h3
            className="font-semibold text-lg"
            style={{
              color: danger
                ? "#ef4444"
                : "var(--text-primary)",
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
        </div>
      </div>

      <ChevronRight
        size={20}
        color="#8b8b99"
      />
    </button>
  );
}
function AccountTab({
  profile,
  handleLogout,
  logout,
  email,
}) {
  const navigate = useNavigate();

  const handleDeactivate = async () => {
    const confirmed = window.confirm("Are you sure you want to deactivate your account?\n\nYou can restore it anytime by signing up again with the same email." );

    if (!confirmed) return;
    try {
      await api.post("/auth/deactivate");
      alert("Your account has been deactivated successfully.");
      logout();
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.detail ||
        "Unable to deactivate account."
      );
    }
  };

  return (
    <div className="min-h-[650px] flex flex-col gap-8">

      {/* ================= Account Actions ================= */}

      <div>
        <h2
          className="text-lg font-semibold mb-4"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Account Actions
        </h2>

        <div className="space-y-4">

          <AccountCard
            icon={Lock}
            title="Change Password"
            description="Update your account password securely."
            onClick={() => {
              navigate("/change-password");
            }}
          />

          <AccountCard
            icon={LogOut}
            title="Logout"
            description="Sign out from ResumeIQ."
            onClick={handleLogout}
          />

        </div>
      </div>

      {/* ================= Danger Zone ================= */}

      <div>
        <h2
          className="text-lg font-semibold mb-4"
          style={{
            color: "#ef4444",
          }}
        >
          Danger Zone
        </h2>

        <AccountCard
          icon={Trash2}
          title="Deactivate Account"
          description="Temporarily deactivate your account. You can restore it anytime using the same email."
          danger
          onClick={handleDeactivate}
        />
      </div>

      {/* ================= Security ================= */}

      <div
        className="rounded-2xl p-5"
        style={{
          background: "rgba(124,111,240,.08)",
          border: "1px solid rgba(124,111,240,.15)",
        }}
      >
        <h3
          className="font-semibold text-lg mb-5"
          style={{
            color: "var(--text-primary)",
          }}
        >
          🔒 Security Features
        </h3>

        <div className="space-y-4">

          {/* Password Authentication */}
          <div className="flex items-center justify-between">
            <div>
              <h4
                className="font-medium"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                🔐 Password Authentication
              </h4>

              <p
                className="text-sm"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Secure login using your password.
              </p>
            </div>

            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(34,197,94,.15)",
                color: "#22c55e",
              }}
            >
              Active
            </span>
          </div>

          {/* JWT Protection */}
          <div className="flex items-center justify-between">
            <div>
              <h4
                className="font-medium"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                🛡 JWT Session Protection
              </h4>

              <p
                className="text-sm"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Keeps your session secure while signed in.
              </p>
            </div>

            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(34,197,94,.15)",
                color: "#22c55e",
              }}
            >
              Enabled
            </span>
          </div>

          {/* Password Recovery */}
          <div className="flex items-center justify-between">
            <div>
              <h4
                className="font-medium"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                📧 Password Recovery
              </h4>

              <p
                className="text-sm"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Reset your password securely via email.
              </p>
            </div>

            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(34,197,94,.15)",
                color: "#22c55e",
              }}
            >
              Available
            </span>
          </div>

          {/* Private Resume Storage */}
          <div className="flex items-center justify-between">
            <div>
              <h4
                className="font-medium"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                📄 Private Resume Storage
              </h4>

              <p
                className="text-sm"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Your resumes are accessible only from your account.
              </p>
            </div>

            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(34,197,94,.15)",
                color: "#22c55e",
              }}
            >
              Enabled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountTab;