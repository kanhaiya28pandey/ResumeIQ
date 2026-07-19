function AnalysisSummary({
  summary,
  overallVerdict,
  experienceLevel,
  strengths,
  weaknesses,
}) {
  return (
    <div
      className="p-6 rounded-2xl animate-fade-in-up"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

        <div className="flex-1">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            AI Resume Summary
          </h2>

          <p
            className="leading-7"
            style={{ color: "var(--text-secondary)" }}
          >
            {summary}
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">

          <div
            className="px-4 py-3 rounded-xl"
            style={{
              background: "var(--bg-page)",
              border: "1px solid var(--border-divider)",
            }}
          >
            <p
              className="text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Verdict
            </p>

            <h3
              className="font-semibold mt-1"
              style={{ color: "var(--success)" }}
            >
              {overallVerdict}
            </h3>
          </div>

          <div
            className="px-4 py-3 rounded-xl"
            style={{
              background: "var(--bg-page)",
              border: "1px solid var(--border-divider)",
            }}
          >
            <p
              className="text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Experience
            </p>

            <h3
              className="font-semibold mt-1"
              style={{ color: "var(--accent)" }}
            >
              {experienceLevel}
            </h3>
          </div>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <div>
          <h3
            className="font-semibold mb-3"
            style={{ color: "var(--success)" }}
          >
            ✅ Strengths
          </h3>

          <div className="space-y-2">
            {strengths.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-lg"
                style={{
                  background: "var(--bg-page)",
                  border: "1px solid var(--border-divider)",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3
            className="font-semibold mb-3"
            style={{ color: "var(--danger)" }}
          >
            ❌ Weaknesses
          </h3>

          <div className="space-y-2">
            {weaknesses.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-lg"
                style={{
                  background: "var(--bg-page)",
                  border: "1px solid var(--border-divider)",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AnalysisSummary;