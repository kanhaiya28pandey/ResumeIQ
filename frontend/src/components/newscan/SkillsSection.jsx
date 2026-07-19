import SkillTag from "../SkillTag";

function SkillsSection({
  matchedSkills,
  missingSkills,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up">

      {/* Matched Skills */}
      <div
        className="p-6 rounded-2xl"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              ✅ Matched Skills
            </h2>

            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              Skills found in your resume
            </p>
          </div>

          <div
            className="px-3 py-1 rounded-full text-sm font-semibold"
            style={{
              background: "var(--success)",
              color: "#fff",
            }}
          >
            {matchedSkills.length}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {matchedSkills.length ? (
            matchedSkills.map((skill) => (
              <SkillTag
                key={skill}
                skill={skill}
                matched
              />
            ))
          ) : (
            <p style={{ color: "var(--text-muted)" }}>
              No matched skills found.
            </p>
          )}
        </div>
      </div>

      {/* Missing Skills */}

      <div
        className="p-6 rounded-2xl"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              ❌ Missing Skills
            </h2>

            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              Skills missing for this job
            </p>
          </div>

          <div
            className="px-3 py-1 rounded-full text-sm font-semibold"
            style={{
              background: "var(--danger)",
              color: "#fff",
            }}
          >
            {missingSkills.length}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {missingSkills.length ? (
            missingSkills.map((skill) => (
              <SkillTag
                key={skill}
                skill={skill}
                matched={false}
              />
            ))
          ) : (
            <div
              className="w-full p-4 rounded-xl text-center"
              style={{
                background: "var(--bg-page)",
                border: "1px solid var(--border-divider)",
                color: "var(--success)",
              }}
            >
              🎉 Excellent! No missing skills found.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default SkillsSection;