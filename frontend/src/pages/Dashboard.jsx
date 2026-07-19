import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, TrendingUp, Award, ShieldCheck, Sparkles, ArrowRight, } from "lucide-react";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import TrendChart from "../components/TrendChart";
import ATSGradeChart from "../components/ATSGradeChart";
import DomainChart from "../components/DomainChart";
import ImprovementRoadmap from "../components/ImprovementRoadmap";

function Dashboard() {
  const navigate = useNavigate();
  const { name } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full min-h-[70vh]">
          <div
            className="w-12 h-12 rounded-full border-4 animate-spin"
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

      {/* ================= HERO ================= */}

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Welcome back{name ? `, ${name}` : ""}
          </h1>

          <p
            className="mt-2 text-base"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Every scan brings you one step closer to your dream job.
          </p>

        </div>
        <button
          onClick={() => navigate("/new-scan")}
          className="px-7 py-3 rounded-xl font-semibold transition-all hover:scale-105"
          style={{
            background: "var(--accent)",
            color: "#fff",
          }}
        >
          + New Scan
        </button>

      </div>

      {/* ================= STATS ================= */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5 mb-8">
        <StatCard
          title="Total Scans"
          value={data.totalScans}
          subtitle="Resume analyses completed"
          icon={FileText}
          color="#7C6FF0"
        />

        <StatCard
          title="Average Match"
          value={`${data.averageMatchScore}%`}
          subtitle="Across all resumes"
          icon={TrendingUp}
          color="#2DD4BF"
        />

        <StatCard
          title="Highest Match"
          value={`${data.highestMatchScore}%`}
          subtitle="Your best performance"
          icon={Award}
          color="#F59E0B"
        />

        <StatCard
          title="Average ATS"
          value={data.averageAtsScore}
          subtitle="Recruiter readiness"
          icon={ShieldCheck}
          color="#FB7185"
        />

      </div>

      {/* ================= TREND ================= */}

      <div
        className="rounded-3xl p-6 mb-8"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2
              className="text-2xl font-semibold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              Match Score Trend
            </h2>
            <p
              className="mt-1"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              See how your resumes have improved over time.
            </p>
          </div>
          <div
            className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-2xl"
            style={{
              background: "rgba(124,111,240,.08)",
            }}
          >
            <TrendingUp
              color="#7C6FF0"
              size={26}
            />

            <div>

              <p
                className="text-xs"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Current Average
              </p>

              <h3
                className="text-xl font-bold"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                {data.averageMatchScore}%
              </h3>

            </div>

          </div>

        </div>

        <TrendChart
          data={data.scoreTrend}
        />

      </div>

      {/* ================= CHARTS ================= */}
      {/* ================= ATS + DOMAIN ================= */}

      <div className="grid xl:grid-cols-2 gap-6 mb-8">

        {/* ATS */}

        <div
          className="rounded-3xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
          }}
        >

          <div className="mb-5">

            <h2
              className="text-lg font-semibold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              ATS Grade Distribution
            </h2>

            <p
              className="text-xs"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Distribution of ATS grades across all resume scans.
            </p>

          </div>

          <ATSGradeChart
            data={data.gradeDistribution}
            average={data.averageAtsScore}
          />

        </div>

        {/* DOMAIN */}

        <div
          className="rounded-3xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
          }}
        >

          <div className="mb-5">

            <h2
              className="text-lg font-semibold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              Domains Scanned
            </h2>

            <p
              className="text-xs"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Professional domains you've analysed most often.
            </p>

          </div>

          <DomainChart
            data={data.domainDistribution}
          />

        </div>

      </div>

      {/* ================= ROADMAP + BEST RESUME ================= */}

      <div className="grid xl:grid-cols-2 gap-6 mb-8">

        {/* ROADMAP */}

        <ImprovementRoadmap
          roadmap={data.roadmap}
        />

        {/* BEST RESUME */}

        <div
          onClick={() => navigate(`/scan/${data.bestResume._id}`)}
          className="cursor-pointer rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl "
          style={{
            background:
              "linear-gradient(135deg, rgba(124,111,240,.12), var(--bg-card))",
            border: "1px solid rgba(124,111,240,.25)",
          }}
        >
          {/* TOP */}

          <div className="flex justify-between items-start mb-5">
            <div>
              <p
                className="text-xs font-semibold tracking-widest uppercase"
                style={{
                  color: "#F5B942",
                }}

              >
                🏆 Best Performing Resume
              </p>

              <h2
                className="mt-3 text-2xl font-bold"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                {data.bestResume?.jobTitle}
              </h2>
              <p

                className="mt-1"
                style={{
                  color: "var(--text-secondary)",
                }}

              >
                {data.bestResume?.detectedDomain}
              </p>
            </div>

            <div
              className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{
                background: "#22C55E20",
                color: "#22C55E",
              }}

            >
              Grade {data.bestResume?.atsGrade}
            </div>
          </div>

          {/* SCORE */}

          <div className="my-7">
            <div
              className="text-5xl font-extrabold"
              style={{
                color: "var(--accent)",
              }}

            >
              {data.bestResume?.matchScore}%
            </div>

            <div
              className="mt-2"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Match Score
            </div>
          </div>

          {/* SKILLS */}

          <div>
            <p
              className="font-semibold mb-3"
              style={{
                color: "var(--text-primary)",
              }}

            >
              Top Skills
            </p>

            <div className="flex flex-wrap gap-2">

              {(data.bestResume?.matchedSkills || [])
                ?.slice(0, 4)
                .map((skill) => (

                  <span

                    key={skill}

                    className="px-3 py-1 rounded-full text-sm"

                    style={{

                      background:
                        "rgba(124,111,240,.12)",

                      color:
                        "var(--accent)",

                    }}

                  >
                    {skill}
                  </span>

                ))}

              {(data.bestResume?.matchedSkills || [])?.length > 4 && (

                <span

                  className="px-3 py-1 rounded-full text-sm"

                  style={{

                    background:
                      "rgba(79,209,168,.12)",

                    color:
                      "#22C55E",

                  }}

                >
                  +

                  {data.bestResume.matchedSkills.length - 4}

                  {" "}More

                </span>

              )}
              {(!data.bestResume?.matchedSkills ||
                data.bestResume.matchedSkills.length === 0) && (

                  <span
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    No skills available
                  </span>

                )}

            </div>

          </div>

          {/* BUTTON */}

          <div className="mt-8">
            <button
              className=" flex items-center gap-1 text-sm font-medium transition-all hover:translate-x-1 "
              style={{
                color: "var(--accent)",
              }}
            >

              View Full Analysis

              <ArrowRight
                size={18}
              />
            </button>
          </div>
        </div>
      </div>
      {/* ================= RECENT SCANS + MISSING SKILLS ================= */}

      <div className="grid grid-cols-12 gap-6 mb-8">

        {/* ---------------- RECENT SCANS ---------------- */}

        <div
          className="col-span-12 xl:col-span-8 rounded-3xl p-6"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
          }}
        >

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2
                className="text-lg font-semibold"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                Recent Scans
              </h2>

              <p
                className="text-xs"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Click any scan to view the complete analysis.
              </p>

            </div>

          </div>

          <div className="space-y-2.5">

            {data.recentScans.map((scan) => (

              <div
                key={scan._id}
                onClick={() => navigate(`/scan/${scan._id}`)}
                className=" cursor-pointer rounded-2xl px-5 py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg "
                style={{
                  background: "var(--bg-page)",
                  border: "1px solid var(--border-subtle)",
                }}
              >

                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className="font-semibold text-base"
                      style={{
                        color: "var(--text-primary)",
                      }}
                    >
                      {scan.jobTitle}
                    </h3>

                    <p
                      className="mt-1 text-sm"
                      style={{
                        color: "var(--text-secondary)",
                      }}
                    >
                      {scan.detectedDomain}
                    </p>

                  </div>

                  <div className="text-right">

                    <div
                      className="text-2xl font-bold"
                      style={{
                        color: "var(--accent)",
                      }}
                    >
                      {scan.matchScore}%
                    </div>

                    <div
                      className="text-xs"
                      style={{
                        color: "#22C55E",
                      }}
                    >
                      {scan.overallVerdict}
                    </div>

                  </div>

                </div>

                <div className="flex justify-end mt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/scan/${data.bestResume._id}`);
                    }}
                    className=" mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 hover:translate-x-1 "
                    style={{
                      background: "rgba(124,111,240,.12)",
                      color: "var(--accent)",
                    }}
                  >
                    View Full Analysis
                    <ArrowRight size={16} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* ---------------- MISSING SKILLS ---------------- */}

        <div
          className="col-span-12 xl:col-span-4 rounded-3xl p-6"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
          }}
        >

          <h2
            className="text-xl font-semibold mb-2"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Most Missing Skills
          </h2>

          <p
            className="text-sm mb-6"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Frequently missing across your resumes.
          </p>

          <div className="space-y-3">

            {data.commonMissingSkills.map((item) => (

              <div
                key={item.skill}
                className=" rounded-xl px-4 py-3 transition-all duration-300 hover:scale-[1.02] "
                style={{
                  background: "rgba(239,68,68,.08)",
                  border: "1px solid rgba(239,68,68,.12)",
                }}
              >

                <div className="flex items-center justify-between">
                  <span
                    className="font-semibold"
                    style={{
                      color: "var(--text-primary)",
                    }}
                  >
                    {item.skill}
                  </span>

                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: "#EF444420",
                      color: "#EF4444",
                    }}
                  >
                    High
                  </span>

                </div>

                <p
                  className="text-xs mt-1"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Missing in <strong>{item.count}</strong> scan{item.count > 1 ? "s" : ""}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>
      {/* ================= AI TIP ================= */}

      <div className="flex justify-center pb-8">

        <div
          className=" w-full max-w-2xl rounded-3xl px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl "
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
          }}
        >

          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(124,111,240,.12)",
              }}
            >
              <Sparkles
                size={22}
                color="#7C6FF0"
              />
            </div>

            <div className="flex-1">

              <h2
                className="text-lg font-semibold"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                AI Tip of the Day
              </h2>

              <p
                className="mt-2 leading-7"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                {data.tipOfDay}
              </p>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>

  );

}

export default Dashboard;