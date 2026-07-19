import { useState, } from "react";
import { Link, useNavigate, } from "react-router-dom";
import api from "../api/axiosInstance";

function ForgotPassword() {
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const triggerShake = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSuccess("OTP sent to your email");
      setStep(2);
    } catch (err) {
      triggerShake(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      setResetToken(res.data.resetToken);
      setSuccess("");
      setStep(3);
    } catch (err) {
      triggerShake(err.response?.data?.detail || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword.length < 8) {
      triggerShake("Password must be at least 8 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      triggerShake("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", { resetToken, newPassword });
      setSuccess(
        "Password changed successfully."
      );

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");

        navigate("/login");

      }, 2000);
    } catch (err) {
      triggerShake(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden page-atmosphere" style={{ background: "var(--bg-page)" }}>
      <div className="dot-grid" />

      <div
        className={`relative w-full max-w-md p-8 rounded-2xl overflow-hidden animate-fade-in-up ${shake ? "animate-shake" : ""}`}
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
      >
        <div className="scan-line" />

        <h1 className="text-2xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          Reset Password
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          {step === 1 && "Enter your email to receive an OTP"}
          {step === 2 && "Enter the OTP sent to your email"}
          {step === 3 && "Set your new password"}
        </p>

        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="h-1 flex-1 rounded-full transition-all"
              style={{ background: s <= step ? "var(--accent)" : "var(--border-subtle)" }}
            />
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <div>
              <label className="text-sm block mb-1" style={{ color: "var(--text-secondary)" }}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg outline-none"
                style={{ background: "var(--bg-page)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
                placeholder="you@example.com"
              />
            </div>

            {error && <p className="text-sm" style={{ color: "var(--danger)" }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg font-medium mt-2 flex items-center justify-center gap-2"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              {loading && <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full" />}
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            {success && <p className="text-sm" style={{ color: "var(--success)" }}>{success}</p>}

            <div>
              <label className="text-sm block mb-1" style={{ color: "var(--text-secondary)" }}>OTP</label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 rounded-lg outline-none text-center tracking-widest text-lg"
                style={{ background: "var(--bg-page)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
                placeholder="000000"
              />
            </div>

            {error && <p className="text-sm" style={{ color: "var(--danger)" }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg font-medium mt-2 flex items-center justify-center gap-2"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              {loading && <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full" />}
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <div>
              <label className="text-sm block mb-1" style={{ color: "var(--text-secondary)" }}>New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg outline-none"
                style={{ background: "var(--bg-page)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label className="text-sm block mb-1" style={{ color: "var(--text-secondary)" }}>Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg outline-none"
                style={{ background: "var(--bg-page)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
                placeholder="Re-enter password"
              />
            </div>

            {error && <p className="text-sm" style={{ color: "var(--danger)" }}>{error}</p>}
            {success && <p className="text-sm" style={{ color: "var(--success)" }}>{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg font-medium mt-2 flex items-center justify-center gap-2"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              {loading && <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full" />}
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
        <p
          className="text-sm text-center mt-6"
          style={{ color: "var(--text-secondary)" }}
        >
          Remembered your password?{" "}
          <Link
            to="/login"
            style={{ color: "var(--accent)" }}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;