import ScoreRing from "../ScoreRing";

function ScoreSection({ matchScore, atsScore }) {
  return (
    <div
      className="p-6 rounded-2xl animate-fade-in-up"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div className="mb-6">
        <h2
          className="text-xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Overall Scores
        </h2>

        <p
          className="text-sm mt-1"
          style={{ color: "var(--text-secondary)" }}
        >
          Resume compatibility and ATS performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
        <ScoreRing
          score={matchScore}
          label="Match Score"
        />

        <ScoreRing
          score={atsScore}
          label="ATS Score"
        />
      </div>
    </div>
  );
}

export default ScoreSection;