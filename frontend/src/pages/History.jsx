import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CalendarDays, Clock3, Briefcase, Award, Target, ChevronRight, } from "lucide-react";
import api from "../api/axiosInstance";
import DashboardLayout from "../layouts/DashboardLayout";
import SkillTag from "../components/SkillTag";

function History() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await api.get("/history");
        setScans(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  // Helpers
  const getVerdictColor = (verdict = "") => {
    verdict = verdict.toLowerCase();
    if (verdict.includes("excellent"))
      return "var(--success)";

    if (verdict.includes("good"))
      return "#3b82f6";

    if (verdict.includes("moderate"))
      return "var(--warning)";

    return "var(--danger)";
  };

  const scoreColor = (score) => {
    if (score >= 85)
      return "var(--success)";

    if (score >= 70)
      return "var(--warning)";

    return "var(--danger)";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + "Z");
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) {
      return `Today • ${date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      })}`;
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday • ${date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      })}`;
    }

    return `${date.toLocaleDateString("en-IN", {

      day: "2-digit",

      month: "short",

      year: "numeric",

      timeZone: "Asia/Kolkata",

    })} • ${date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    })}`;

  };

  // Search + Filter

  const filteredScans = useMemo(() => {
    return scans.filter((scan) => {
      const searchMatch =
        scan.jobTitle
          ?.toLowerCase()
          .includes(search.toLowerCase());
      if (filter === "All")
        return searchMatch;

      return (
        searchMatch &&
        scan.overallVerdict === filter
      );

    });

  }, [search, filter, scans]);

  //---------------------------------------------------

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[70vh]">
          <span
            className="spinner w-10 h-10 rounded-full border-2"
            style={{
              borderColor: "var(--accent)",
              borderTopColor: "transparent",
            }}
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <h1
            className="text-3xl font-bold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            History
          </h1>

          <p
            className="mt-2"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            View all your previous resume analyses.
          </p>

        </div>

        {/* Search */}

        <div className="relative w-full lg:w-80">

          <Search
            size={18}
            className="absolute left-3 top-3"
            color="gray"
          />

          <input
            type="text"
            placeholder="Search Job Title..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl pl-10 pr-4 py-3 outline-none"
            style={{
              background: "var(--bg-card)",
              border:
                "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
            }}
          />

        </div>

      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-3 mt-8">

        {[
          "All",
          "Excellent Match",
          "Good Match",
          "Moderate Match",
          "Poor Match",
        ].map((item) => (

          <button
            key={item}
            onClick={() => setFilter(item)}
            className="px-4 py-2 rounded-full transition-all"
            style={{
              background:
                filter === item
                  ? "var(--accent)"
                  : "var(--bg-card)",

              color:
                filter === item
                  ? "#fff"
                  : "var(--text-primary)",

              border:
                "1px solid var(--border-subtle)",
            }}
          >
            {item}
          </button>

        ))}

      </div>

      {/* Cards */}

      <div className="space-y-6 mt-8">

        {filteredScans.length === 0 ? (

          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background: "var(--bg-card)",
              border:
                "1px solid var(--border-subtle)",
            }}
          >
            <h2
              style={{
                color: "var(--text-primary)",
              }}
            >
              No Resume Scans Found
            </h2>

            <p
              className="mt-2"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Try changing the search or filter.
            </p>

          </div>

        ) : (

          filteredScans.map((scan) => (

            <div
              key={scan.id}
              className="rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{
                background: "var(--bg-card)",
                border:
                  "1px solid var(--border-subtle)",
              }}
            >
              {/* Top */}

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                <div>

                  <h2
                    className="text-xl font-semibold"
                    style={{
                      color: "var(--text-primary)",
                    }}
                  >
                    {scan.jobTitle}
                  </h2>

                  <div className="flex flex-wrap gap-4 mt-3">

                    <div
                      className="flex items-center gap-2"
                      style={{
                        color: "var(--text-secondary)",
                      }}
                    >
                      <CalendarDays size={16} />
                      {formatDate(scan.createdAt)}
                    </div>

                    <div
                      className="flex items-center gap-2"
                      style={{
                        color: "var(--text-secondary)",
                      }}
                    >
                      <Briefcase size={16} />
                      {scan.detectedDomain}
                    </div>

                  </div>

                </div>

                <span
                  className="px-4 py-2 rounded-full font-medium"
                  style={{
                    background: `${getVerdictColor(
                      scan.overallVerdict
                    )}22`,
                    color: getVerdictColor(
                      scan.overallVerdict
                    ),
                  }}
                >
                  {scan.overallVerdict}
                </span>

              </div>

              {/* Score Cards */}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

                {[
                  {
                    title: "Match",
                    value: `${scan.matchScore}%`,
                    color: scoreColor(scan.matchScore),
                  },
                  {
                    title: "ATS",
                    value: `${scan.atsScore}%`,
                    color: scoreColor(scan.atsScore),
                  },
                  {
                    title: "Grade",
                    value: scan.atsGrade,
                    color: "var(--accent)",
                  },
                  {
                    title: "Experience",
                    value: scan.experienceLevel,
                    color: "#3b82f6",
                  },
                ].map((item) => (

                  <div
                    key={item.title}
                    className="rounded-xl p-4"
                    style={{
                      background: "var(--bg-page)",
                      border:
                        "1px solid var(--border-divider)",
                    }}
                  >

                    <div
                      className="text-sm"
                      style={{
                        color:
                          "var(--text-secondary)",
                      }}
                    >
                      {item.title}
                    </div>

                    <div
                      className="text-xl font-bold mt-2"
                      style={{
                        color: item.color,
                      }}
                    >
                      {item.value}
                    </div>

                  </div>

                ))}

              </div>

              {/* Skills */}

              <div className="mt-6">

                <h3
                  className="font-semibold mb-3"
                  style={{
                    color: "var(--success)",
                  }}
                >
                  Matched Skills
                </h3>

                <div className="flex flex-wrap gap-2">

                  {scan.matchedSkills?.length ? (

                    <>
                      {scan.matchedSkills
                        .slice(0, 6)
                        .map((skill) => (

                          <SkillTag
                            key={skill}
                            skill={skill}
                            matched
                          />

                        ))}

                      {scan.matchedSkills.length >
                        6 && (

                          <span
                            className="px-3 py-1 rounded-full text-sm"
                            style={{
                              background:
                                "var(--bg-page)",
                            }}
                          >
                            +
                            {scan.matchedSkills
                              .length - 6}{" "}
                            more
                          </span>

                        )}

                    </>

                  ) : (

                    <span
                      style={{
                        color:
                          "var(--text-secondary)",
                      }}
                    >
                      None
                    </span>

                  )}

                </div>

              </div>

              {/* Missing Skills */}

              <div className="mt-6">

                <h3
                  className="font-semibold mb-3"
                  style={{
                    color: "var(--danger)",
                  }}
                >
                  Missing Skills
                </h3>

                <div className="flex flex-wrap gap-2">

                  {scan.missingSkills?.length ? (

                    <>
                      {scan.missingSkills
                        .slice(0, 6)
                        .map((skill) => (

                          <SkillTag
                            key={skill}
                            skill={skill}
                            matched={false}
                          />

                        ))}

                      {scan.missingSkills.length >
                        6 && (

                          <span
                            className="px-3 py-1 rounded-full text-sm"
                            style={{
                              background:
                                "var(--bg-page)",
                            }}
                          >
                            +
                            {scan.missingSkills
                              .length - 6}{" "}
                            more
                          </span>

                        )}

                    </>

                  ) : (

                    <span
                      style={{
                        color:
                          "var(--text-secondary)",
                      }}
                    >
                      None
                    </span>

                  )}

                </div>

              </div>

              {/* Footer */}

              <div className="flex justify-end mt-8">

                <button
                  onClick={() => navigate(`/scan/${scan.id}`)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "var(--accent)",
                    color: "#fff",
                  }}
                >
                  View Details
                  <ChevronRight size={18} />
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </DashboardLayout>

  );

}

export default History;