import SkillMatchChart from "./SkillMatchChart";
import ATSBreakdownChart from "./ATSBreakdownChart";

function AnalyticsSection({
  matchedSkills,
  missingSkills,
  matchScore,
  atsScore,
  atsBreakdown,
}) {
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
        Resume Analytics
      </h2>

      <p
        className="text-sm mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        Visual insights of your resume performance.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <SkillMatchChart
          matchedSkills={matchedSkills}
          missingSkills={missingSkills}
        />

        <ATSBreakdownChart
          matchScore={matchScore}
          atsScore={atsScore}
          atsBreakdown={atsBreakdown}
        />

      </div>

    </div>
  );
}

export default AnalyticsSection;