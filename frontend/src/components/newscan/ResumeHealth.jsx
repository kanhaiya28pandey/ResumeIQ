function ResumeHealth({
  matchScore,
  atsScore,
  matchedSkills,
  missingSkills,
}) {
  const totalSkills = matchedSkills.length + missingSkills.length;

  const skillHealth = totalSkills
    ? Math.round((matchedSkills.length / totalSkills) * 100)
    : 100;

  const items = [
    {
      label: "Skill Match",
      value: skillHealth,
      color: "var(--success)",
    },
    {
      label: "ATS Readiness",
      value: atsScore,
      color: "var(--accent)",
    },
    {
      label: "Resume Match",
      value: matchScore,
      color: "var(--warning)",
    },
  ];

  return (
    <div
      className="p-6 rounded-2xl animate-fade-in-up"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <h2
        className="text-xl font-semibold mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        Resume Health
      </h2>

      <p
        className="text-sm mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        Overall quality based on the uploaded resume.
      </p>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.label}>
            <div
              className="flex justify-between mb-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>

            <div
              className="h-3 rounded-full overflow-hidden"
              style={{ background: "var(--border-divider)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${item.value}%`,
                  background: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeHealth;