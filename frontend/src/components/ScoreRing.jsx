import { useEffect, useState } from "react";

function ScoreRing({ score, label, size = 150 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 150);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  const color =
    score >= 80
      ? "var(--success)"
      : score >= 60
      ? "var(--warning)"
      : "var(--danger)";

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--border-divider)"
            strokeWidth="12"
            fill="none"
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.2s ease",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="text-4xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {score}
          </div>

          <div
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            %
          </div>
        </div>
      </div>

      <p
        className="mt-4 font-medium"
        style={{ color: "var(--text-primary)" }}
      >
        {label}
      </p>
    </div>
  );
}

export default ScoreRing;