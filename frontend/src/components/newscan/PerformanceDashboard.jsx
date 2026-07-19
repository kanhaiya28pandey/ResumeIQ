import ScoreRing from "../ScoreRing";
import StatCard from "../StatCard";
import AnalyticsSection from "./AnalyticsSection";
import { CheckCircle2, XCircle, Target, Lightbulb, Briefcase, ShieldCheck, } from "lucide-react";

function PerformanceDashboard({
  detectedDomain,
  matchScore,
  skillScore,
  semanticScore,
  atsScore,
  atsGrade,
  atsBreakdown,
  matchedSkills,
  missingSkills,
  criticalMissingSkills,
  supportingMissingSkills,
  matchedWeight,
  totalWeight,
  suggestions,
}) {
  return (
    <div
      className="rounded-2xl p-6 animate-fade-in-up"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

        <div>
          <h2
            className="text-2xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Performance Dashboard
          </h2>

          <p
            style={{ color: "var(--text-secondary)" }}
          >
            AI-powered resume performance overview
          </p>
        </div>

        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{
            background: "rgba(108,99,255,.12)",
            color: "var(--accent)",
          }}
        >
          <Briefcase size={18} />

          <span className="font-medium">
            {detectedDomain}
          </span>
        </div>

      </div>

      {/* Score Rings */}

      <div className="grid lg:grid-cols-4 gap-5">

        <ScoreRing
          score={matchScore}
          label="Match Score"
        />

        <ScoreRing
          score={skillScore}
          label="Skill Score"
        />

        <ScoreRing
          score={semanticScore}
          label="Semantic Score"
        />

        <ScoreRing
          score={atsScore}
          label={`ATS (${atsGrade})`}
        />

      </div>

      {/* Stats */}

      <div className="grid lg:grid-cols-2 gap-6 mt-6">

        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--bg-page)",
            border: "1px solid var(--border-divider)",
          }}
        >
          <div className="grid gap-3">

            <StatCard
              title="Matched Skills"
              value={matchedSkills.length}
              icon={CheckCircle2}
              color="var(--success)"
            />

            <StatCard
              title="Missing Skills"
              value={missingSkills.length}
              icon={XCircle}
              color="var(--danger)"
            />

            <StatCard
              title="Critical Missing"
              value={criticalMissingSkills.length}
              icon={ShieldCheck}
              color="var(--danger)"
            />

            <StatCard
              title="Suggestions"
              value={suggestions.length}
              icon={Lightbulb}
              color="var(--accent)"
            />

          </div>
        </div>

        {/* Weight Progress */}

        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--bg-page)",
            border: "1px solid var(--border-divider)",
          }}
        >

          <h3
            className="font-semibold mb-5"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Skill Weight Coverage
          </h3>

          <div
            className="w-full h-4 rounded-full overflow-hidden"
            style={{
              background: "rgba(255,255,255,.08)",
            }}
          >
            <div
              className="h-full"
              style={{
                width: `${(matchedWeight / Math.max(totalWeight, 1)) * 100}%`,
                background: "var(--success)",
              }}
            />
          </div>

          <div
            className="flex justify-between mt-3"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            <span>
              {matchedWeight} / {totalWeight} Weight
            </span>

            <span>
              {Math.round(
                (matchedWeight /
                  Math.max(totalWeight, 1)) *
                  100
              )}
              %
            </span>

          </div>

          <hr
            className="my-5"
            style={{
              borderColor:
                "var(--border-divider)",
            }}
          />

          <div className="space-y-2">

            <div
              className="flex justify-between"
            >
              <span>Critical Missing</span>

              <span
                style={{
                  color: "var(--danger)",
                }}
              >
                {criticalMissingSkills.length}
              </span>

            </div>

            <div
              className="flex justify-between"
            >
              <span>Supporting Missing</span>

              <span
                style={{
                  color: "var(--warning)",
                }}
              >
                {supportingMissingSkills.length}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Analytics */}

      <div className="mt-6">

        <AnalyticsSection
          matchedSkills={matchedSkills}
          missingSkills={missingSkills}
          matchScore={matchScore}
          atsScore={atsScore}
          atsBreakdown={atsBreakdown}
        />

      </div>

    </div>
  );
}

export default PerformanceDashboard;