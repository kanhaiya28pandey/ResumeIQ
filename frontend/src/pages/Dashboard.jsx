import { useEffect, useState } from "react";
import { FileText, TrendingUp, Award, ShieldCheck } from "lucide-react";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TrendChart from "../components/TrendChart";

function Dashboard() {
  const [data, setData] = useState(null);
  const { name } = useAuth();

  useEffect(() => {
    api.get("/dashboard").then((res) => setData(res.data));
  }, []);

  if (!data) {
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

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          Welcome back{name ? `, ${name}` : ""}
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
          Here's how your resume has been performing
        </p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Scans" value={data.totalScans} icon={FileText} color="#7c6ff0" />
          <StatCard label="Avg Match Score" value={`${data.averageMatchScore}%`} icon={TrendingUp} color="#4fd1a8" />
          <StatCard label="Highest Match" value={`${data.highestMatchScore}%`} icon={Award} color="#f0b955" />
          <StatCard label="Avg ATS Score" value={`${data.averageAtsScore}`} icon={ShieldCheck} color="#f08080" />
        </div>

        {data.scoreTrend.length > 0 && (
          <div
            className="p-6 rounded-2xl mb-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
          >
            <h2 className="text-sm font-medium mb-4" style={{ color: "var(--text-primary)" }}>
              Score Trend
            </h2>
            <TrendChart data={data.scoreTrend} />
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div
            className="p-6 rounded-2xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
          >
            <h2 className="text-sm font-medium mb-4" style={{ color: "var(--text-primary)" }}>
              Recent Scans
            </h2>
            {data.recentScans.length === 0 ? (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>No scans yet</p>
            ) : (
              <div className="flex flex-col gap-3">
                {data.recentScans.map((scan) => (
                  <div key={scan._id} className="flex justify-between items-center text-sm">
                    <span style={{ color: "var(--text-primary)" }}>{scan.jobTitle}</span>
                    <span style={{ color: "var(--accent)" }}>{scan.matchScore}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className="p-6 rounded-2xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
          >
            <h2 className="text-sm font-medium mb-4" style={{ color: "var(--text-primary)" }}>
              Most Common Missing Skills
            </h2>
            {data.commonMissingSkills.length === 0 ? (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>No data yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {data.commonMissingSkills.map((item) => (
                  <span
                    key={item.skill}
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(240, 128, 128, 0.12)", color: "var(--danger)" }}
                  >
                    {item.skill} × {item.count}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;