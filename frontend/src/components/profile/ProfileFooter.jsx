import { Sparkles, Code2, Database, Cpu, Heart, ShieldCheck, } from "lucide-react";

function TechBadge({ icon, title }) {
  const Icon = icon;

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
      style={{
        background: "rgba(124,111,240,.10)",
        border: "1px solid rgba(124,111,240,.18)",
      }}
    >
      <Icon
        size={16}
        style={{ color: "var(--accent)" }}
      />

      <span
        className="text-sm font-medium"
        style={{
          color: "var(--text-primary)",
        }}
      >
        {title}
      </span>
    </div>
  );
}

function FooterLink({ children }) {
  return (
    <button
      className="text-sm transition-colors duration-300 hover:underline"
      style={{
        color: "var(--text-secondary)",
      }}
    >
      {children}
    </button>
  );
}

function ProfileFooter() {
  return (
    <div
      className="mt-6 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl "
      style={{
        background:
          "linear-gradient(135deg, rgba(124,111,240,.08), rgba(124,111,240,.03))",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-3">
        <Sparkles
          size={28}
          style={{
            color: "var(--accent)",
          }}
        />

        <div>
          <h2
            className="text-2xl font-bold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            ResumeIQ
          </h2>

          <p
            className="text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            AI-Powered Resume Intelligence Platform
          </p>
        </div>
      </div>

      {/* Description */}

      <p
        className="mt-5 leading-7"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        ResumeIQ helps students and professionals analyze resumes,
        improve ATS compatibility, identify skill gaps, and prepare
        for better career opportunities using AI-powered insights.
      </p>

      {/* Technology Stack */}

      <div className="mt-8">
        <h3
          className="font-semibold mb-4"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Built With
        </h3>

        <div className="flex flex-wrap gap-3">
          <TechBadge
            icon={Code2}
            title="React"
          />

          <TechBadge
            icon={Cpu}
            title="FastAPI"
          />

          <TechBadge
            icon={Database}
            title="MongoDB"
          />

          <TechBadge
            icon={ShieldCheck}
            title="JWT Auth"
          />
        </div>
      </div>

      {/* Bottom Section */}

      <div
        className="mt-8 pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        style={{
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div>
          <p
            className="text-sm font-medium"
            style={{
              color: "var(--text-primary)",
            }}
          >
            ResumeIQ v1.0.0
          </p>

          <p
            className="text-xs mt-1"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            © 2026 ResumeIQ. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap gap-5">
          <FooterLink>Privacy Policy</FooterLink>
          <FooterLink>Terms of Service</FooterLink>
          <FooterLink>Support</FooterLink>
        </div>

        <div
          className="flex items-center gap-2 text-sm"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          <Heart
            size={15}
            color="#ef4444"
          />

          Built with passion
        </div>
      </div>
    </div>
  );
}

export default ProfileFooter;