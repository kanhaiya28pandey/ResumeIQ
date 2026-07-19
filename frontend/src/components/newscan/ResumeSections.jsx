import { CheckCircle2, XCircle } from "lucide-react";

function ResumeSections({ sections = [] }) {
  return (
    <div
      className="p-6 rounded-2xl animate-fade-in-up"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <h2
        className="text-xl font-semibold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        Resume Sections
      </h2>

      <p
        className="text-sm mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        Sections detected in your resume.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <div
            key={section.name}
            className="flex items-center justify-between p-4 rounded-xl"
            style={{
              background: "var(--bg-page)",
              border: "1px solid var(--border-divider)",
            }}
          >
            <span
              className="font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {section.name}
            </span>

            {section.present ? (
              <CheckCircle2
                size={22}
                style={{ color: "var(--success)" }}
              />
            ) : (
              <XCircle
                size={22}
                style={{ color: "var(--danger)" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeSections;