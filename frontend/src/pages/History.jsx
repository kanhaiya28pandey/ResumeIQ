import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import api from "../api/axiosInstance";
import Sidebar from "../components/Sidebar";
import SkillTag from "../components/SkillTag";

function History() {
  const [scans, setScans] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    api.get("/history").then((res) => setScans(res.data));
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const scoreColor = (score) => {
    if (score >= 75) return "var(--success)";
    if (score >= 40) return "var(--warning)";
    return "var(--danger)";
  };

  if (!scans) {
    return (
      <div className="min-h-screen flex" style={{ background: "var(--bg-page)" }}>
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <span className="spinner w-8 h-8 border-2 rounded-full" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-page)" }}>
      <Sidebar />

      <div className="flex-1 p-8 max-w-4xl">
        <h1 className="text-2xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          History
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
          All your past resume scans
        </p>

        {scans.length === 0 ? (
          <div
            className="p-10 rounded-2xl text-center animate-fade-in-up"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              No scans yet. Head to New Scan to analyze your first resume.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {scans.map((scan) => (
              <div
                key={scan._id}
                className="rounded-2xl overflow-hidden animate-fade-in-up"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
              >
                <button
                  onClick={() => toggleExpand(scan._id)}
                  className="w-full flex items-center justify-between p-5"
                >
                  <div className="text-left">
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{scan.jobTitle}</p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                      {new Date(scan.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Match</p>
                      <p className="text-sm font-semibold" style={{ color: scoreColor(scan.matchScore) }}>{scan.matchScore}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>ATS</p>
                      <p className="text-sm font-semibold" style={{ color: scoreColor(scan.atsScore) }}>{scan.atsScore}</p>
                    </div>
                    {expandedId === scan._id ? (
                      <ChevronUp size={18} style={{ color: "var(--text-muted)" }} />
                    ) : (
                      <ChevronDown size={18} style={{ color: "var(--text-muted)" }} />
                    )}
                  </div>
                </button>

                {expandedId === scan._id && (
                  <div className="px-5 pb-5" style={{ borderTop: "1px solid var(--border-divider)" }}>
                    <div className="pt-4">
                      <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>Matched Skills</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {scan.matchedSkills.length === 0 ? (
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>None</p>
                        ) : (
                          scan.matchedSkills.map((s) => <SkillTag key={s} skill={s} matched />)
                        )}
                      </div>

                      <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>Missing Skills</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {scan.missingSkills.length === 0 ? (
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>None</p>
                        ) : (
                          scan.missingSkills.map((s) => <SkillTag key={s} skill={s} matched={false} />)
                        )}
                      </div>

                      <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>Suggestions</p>
                      <ul className="flex flex-col gap-1">
                        {scan.improveSuggestions.map((s, i) => (
                          <li key={i} className="text-xs flex gap-2" style={{ color: "var(--text-secondary)" }}>
                            <span style={{ color: "var(--accent)" }}>•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;