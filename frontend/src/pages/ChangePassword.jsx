import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

function ChangePassword() {
  const navigate = useNavigate();
  const otpRequested = useRef(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [shake, setShake] = useState(false);
  const triggerShake = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  useEffect(() => {
  if (otpRequested.current) return;
  otpRequested.current = true;
  const sendOtp = async () => {
    setLoading(true);

    try {
      const res = await api.post("/auth/change-password/request-otp");
      setEmail(res.data.email);
      setSuccess("OTP has been sent to your registered email.");
    } catch (err) {
      triggerShake(
        err.response?.data?.detail || "Unable to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };
  sendOtp();
}, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
      });
      setResetToken(res.data.resetToken);
      setStep(3);
    } catch (err) {
      triggerShake(
        err.response?.data?.detail || "Invalid or expired OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 8) {
      return triggerShake(
        "Password must be at least 8 characters long."
      );
    }

    if (newPassword !== confirmPassword) {
      return triggerShake(
        "Passwords do not match."
      );
    }

    setLoading(true);

    try {
      await api.post("/auth/reset-password", {
        resetToken,
        newPassword,
      });

      setSuccess("Password changed successfully.");

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");

        navigate("/login");
      }, 1800);
    } catch (err) {
      triggerShake(
        err.response?.data?.detail || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center page-atmosphere"
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
          className="text-2xl font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Change Password
        </h1>

        <p
          className="text-sm mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          Secure your account by verifying the OTP sent to your registered email.
        </p>

        {success && (
          <p
            className="text-sm mb-4"
            style={{ color: "var(--success)" }}
          >
            {success}
          </p>
        )}

        {error && (
          <p
            className="text-sm mb-4"
            style={{ color: "var(--danger)" }}
          >
            {error}
          </p>
        )}

        {step === 2 && (
          <form
            onSubmit={handleVerifyOtp}
            className="flex flex-col gap-4"
          >
            <div>
              <label
                className="text-sm block mb-1"
                style={{ color: "var(--text-secondary)" }}
              >
                OTP
              </label>

              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="w-full px-3 py-2 rounded-lg text-center tracking-widest text-lg outline-none"
                style={{
                  background: "var(--bg-page)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg font-medium"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form
            onSubmit={handleChangePassword}
            className="flex flex-col gap-4"
          >
            <div>
              <label
                className="text-sm block mb-1"
                style={{ color: "var(--text-secondary)" }}
              >
                New Password
              </label>

              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg outline-none"
                style={{
                  background: "var(--bg-page)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <label
                className="text-sm block mb-1"
                style={{ color: "var(--text-secondary)" }}
              >
                Confirm Password
              </label>

              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full px-3 py-2 rounded-lg outline-none"
                style={{
                  background: "var(--bg-page)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg font-medium"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              {loading
                ? "Changing..."
                : "Change Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;