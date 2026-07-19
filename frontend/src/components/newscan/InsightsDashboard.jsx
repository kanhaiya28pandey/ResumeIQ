import { Award, Briefcase, CheckCircle2, XCircle, } from "lucide-react";

function InsightsDashboard({
  summary,
  overallVerdict,
  experienceLevel,
  strengths = [],
  weaknesses = [],
  sections = [],
  matchedSkills = [],
  missingSkills = [],
  criticalMissingSkills = [],
  supportingMissingSkills = [],
  detectedDomain,
  skillScore,
  semanticScore,
  atsGrade,
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

      <div className="mb-6">

        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          AI Insights
        </h2>

        <p
          style={{
            color: "var(--text-secondary)",
          }}
        >
          AI powered evaluation of your resume.
        </p>

      </div>

      {/* Top */}

      <div className="grid xl:grid-cols-2 gap-6">

        {/* Candidate Overview */}

        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--bg-page)",
            border: "1px solid var(--border-divider)",
          }}
        >

          <h3
            className="text-lg font-semibold mb-4"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Candidate Overview
          </h3>

          <p
            className="leading-7"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {summary}
          </p>

          <div className="flex flex-wrap gap-3 mt-5">

            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{
                background: "var(--success)",
                color: "#fff",
              }}
            >
              {overallVerdict}
            </span>

            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              {experienceLevel}
            </span>

          </div>

        </div>

        {/* Analysis Summary */}

        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--bg-page)",
            border: "1px solid var(--border-divider)",
          }}
        >

          <div className="grid grid-cols-2 gap-6">

            <div>

              <div className="flex items-center gap-2 mb-2">

                <Award
                  size={18}
                  color="var(--warning)"
                />

                <h3
                  className="font-semibold"
                  style={{
                    color: "var(--text-primary)",
                  }}
                >
                  ATS Grade
                </h3>

              </div>

              <div
                className="text-5xl font-bold"
                style={{
                  color: "var(--accent)",
                }}
              >
                {atsGrade}
              </div>

            </div>

            <div>

              <div className="flex items-center gap-2 mb-2">

                <Briefcase
                  size={18}
                  color="var(--success)"
                />

                <h3
                  className="font-semibold"
                  style={{
                    color: "var(--text-primary)",
                  }}
                >
                  Domain
                </h3>

              </div>

              <div
                className="text-lg font-semibold"
                style={{
                  color: "var(--success)",
                }}
              >
                {detectedDomain}
              </div>

            </div>

          </div>

          <hr
            className="my-5"
            style={{
              borderColor:
                "var(--border-divider)",
            }}
          />

          <div className="grid grid-cols-2 gap-5">

            <div>

              <div
                className="text-sm"
                style={{
                  color:
                    "var(--text-secondary)",
                }}
              >
                Skill Score
              </div>

              <div
                className="text-2xl font-bold mt-1"
                style={{
                  color: "var(--success)",
                }}
              >
                {skillScore}%
              </div>

            </div>

            <div>

              <div
                className="text-sm"
                style={{
                  color:
                    "var(--text-secondary)",
                }}
              >
                Semantic Score
              </div>

              <div
                className="text-2xl font-bold mt-1"
                style={{
                  color: "var(--accent)",
                }}
              >
                {semanticScore}%
              </div>

            </div>

          </div>

          <hr
            className="my-5"
            style={{
              borderColor:
                "var(--border-divider)",
            }}
          />

          <h4
            className="font-semibold mb-3"
            style={{
              color:
                "var(--text-primary)",
            }}
          >
            Resume Sections
          </h4>

          <div className="flex flex-wrap gap-2">

            {sections.map((section) => (

              <span
                key={section.name}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  background: section.present
                    ? "rgba(79,209,168,.15)"
                    : "rgba(240,128,128,.15)",

                  color: section.present
                    ? "var(--success)"
                    : "var(--danger)",
                }}
              >
                {section.present ? "✓" : "✕"}{" "}
                {section.name}
              </span>

            ))}
          </div>
        </div>
      </div>
      {/* Bottom */}

      <div className="grid xl:grid-cols-2 gap-6 mt-6">

        {/* Strengths */}

        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--bg-page)",
            border: "1px solid var(--border-divider)",
          }}
        >

          <h3
            className="font-semibold text-lg mb-4"
            style={{ color: "var(--success)" }}
          >
            Strengths
          </h3>

          <div className="space-y-3">

            {strengths.length ? (
              strengths.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={18}
                    color="var(--success)"
                    className="mt-1"
                  />

                  <span
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item}
                  </span>

                </div>
              ))
            ) : (
              <span
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                No strengths detected.
              </span>
            )}

          </div>

        </div>

        {/* Weaknesses */}

        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--bg-page)",
            border: "1px solid var(--border-divider)",
          }}
        >

          <h3
            className="font-semibold text-lg mb-4"
            style={{ color: "var(--danger)" }}
          >
            Weaknesses
          </h3>

          <div className="space-y-3">

            {weaknesses.length ? (
              weaknesses.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                >
                  <XCircle
                    size={18}
                    color="var(--danger)"
                    className="mt-1"
                  />

                  <span
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item}
                  </span>

                </div>
              ))
            ) : (
              <span
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                No weaknesses detected.
              </span>
            )}

          </div>

        </div>

      </div>

      {/* Skills */}

      <div className="grid xl:grid-cols-3 gap-6 mt-6">

        {/* Matched */}

        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--bg-page)",
            border: "1px solid var(--border-divider)",
          }}
        >

          <h3
            className="font-semibold mb-4"
            style={{
              color: "var(--success)",
            }}
          >
            Matched Skills
          </h3>

          <div className="flex flex-wrap gap-2">

            {matchedSkills.length ? (
              matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    background:
                      "rgba(79,209,168,.15)",
                    color:
                      "var(--success)",
                  }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <span>No matched skills</span>
            )}

          </div>

        </div>

        {/* Critical */}

        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--bg-page)",
            border: "1px solid var(--border-divider)",
          }}
        >

          <h3
            className="font-semibold mb-4"
            style={{
              color: "var(--danger)",
            }}
          >
            Critical Missing
          </h3>

          <div className="flex flex-wrap gap-2">

            {criticalMissingSkills.length ? (
              criticalMissingSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    background:
                      "rgba(240,128,128,.15)",
                    color:
                      "var(--danger)",
                  }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <span
                style={{
                  color: "var(--success)",
                }}
              >
                None 🎉
              </span>
            )}

          </div>

        </div>

        {/* Supporting */}

        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--bg-page)",
            border: "1px solid var(--border-divider)",
          }}
        >

          <h3
            className="font-semibold mb-4"
            style={{
              color: "var(--warning)",
            }}
          >
            Supporting Missing
          </h3>

          <div className="flex flex-wrap gap-2">

            {supportingMissingSkills.length ? (
              supportingMissingSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    background:
                      "rgba(255,193,7,.15)",
                    color:
                      "var(--warning)",
                  }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <span
                style={{
                  color: "var(--success)",
                }}
              >
                None 🎉
              </span>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default InsightsDashboard;