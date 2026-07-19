import { User, Mail, Calendar, Trophy, ShieldCheck, BarChart3, CheckCircle2, Clock3, } from "lucide-react";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="flex items-center gap-3">
        <Icon
          size={18}
          color="#7C6FF0"
        />

        <span
          style={{
            color: "var(--text-secondary)",
          }}
        >
          {label}
        </span>
      </div>

      <span
        className="font-medium"
        style={{
          color: "var(--text-primary)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, color, }) {
  return (
    <div
      className="rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl "
      style={{
        background: "var(--bg-page)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <Icon
        size={26}
        color={color}
      />

      <p
        className="mt-4 text-sm"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        {title}
      </p>

      <h2
        className="text-3xl font-bold mt-2"
        style={{
          color: "var(--text-primary)",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

function TimelineItem({ icon: Icon, title, value, color, }) {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center gap-3">
        <Icon
          size={20}
          color={color}
        />

        <span
          style={{
            color: "var(--text-primary)",
          }}
        >
          {title}
        </span>

      </div>

      <span
        style={{
          color: "var(--text-secondary)",
        }}
      >
        {value}
      </span>

    </div>
  );
}

function OverviewTab({ profile, dashboard, }) {
  return (
    <div className="space-y-6">

      {/* ================= Top ================= */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Profile Summary */}

        <div className="rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl "
          style={{
            background: "var(--bg-page)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <h2
            className="text-xl font-semibold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            👤 Profile Summary

          </h2>

          <p
            className="mt-1 text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Your ResumeIQ profile at a glance.
          </p>

          <div className="mt-6">

            <InfoRow
              icon={User}
              label="Name"
              value={profile.name}
            />

            <InfoRow
              icon={Mail}
              label="Email"
              value={profile.email}
            />

            <InfoRow
              icon={Calendar}
              label="Member Since"
              value={new Date(profile.createdAt).toLocaleDateString()}
            />

          </div>

          <div
            className="mt-8 pt-6"
            style={{
              borderTop: "1px solid var(--border-subtle)",
            }}
          >

            <h3
              className="font-semibold mb-5"
              style={{
                color: "var(--text-primary)",
              }}
            >
              🎯 Career Summary
            </h3>

            <div className="grid grid-cols-2 gap-5">

              <div>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Preferred Domain
                </p>

                <h4
                  className="font-semibold mt-1"
                  style={{
                    color: "var(--text-primary)",
                  }}
                >
                  {dashboard?.bestResume?.detectedDomain ?? "Not Available"}
                </h4>
              </div>

              <div>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Best Resume
                </p>

                <h4
                  className="font-semibold mt-1"
                  style={{
                    color: "var(--text-primary)",
                  }}
                >
                  {dashboard?.bestResume?.jobTitle ?? "Not Available"}
                </h4>
              </div>

              <div>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Average Match
                </p>

                <h4
                  className="font-semibold mt-1"
                  style={{
                    color: "#3DD9C5",
                  }}
                >
                  {dashboard?.averageMatchScore ?? 0}%
                </h4>
              </div>

              <div>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  ATS Grade
                </p>

                <h4
                  className="font-semibold mt-1"
                  style={{
                    color: "#F6B93B",
                  }}
                >
                  {dashboard?.bestResume?.atsGrade ?? "-"}
                </h4>
              </div>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 gap-4">

          <StatCard
            icon={BarChart3}
            title="Total Scans"
            value={dashboard.totalScans}
            color="#7C6FF0"
          />

          <StatCard
            icon={Trophy}
            title="Highest Match"
            value={`${dashboard.highestMatchScore}%`}
            color="#F6B93B"
          />

          <StatCard
            icon={ShieldCheck}
            title="Average ATS"
            value={dashboard.averageAtsScore}
            color="#FF6B6B"
          />

          <StatCard
            icon={CheckCircle2}
            title="Best Grade"
            value={dashboard?.bestResume?.atsGrade ?? "-"}
            color="#22C55E"
          />

        </div>

      </div>
      {/* ================= Recent Activity ================= */}

      <div
        className="rounded-3xl p-6"
        style={{
          background: "var(--bg-page)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <h2
          className="text-xl font-semibold mb-6"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Recent Activity
        </h2>

        <TimelineItem
          icon={CheckCircle2}
          title="Account Created"
          value={new Date(profile.createdAt).toLocaleDateString()}
          color="#22C55E"
        />

        <TimelineItem
          icon={Clock3}
          title="Last Resume Scan"
          value={
            dashboard?.recentScans?.length
              ? new Date(
                dashboard.recentScans[0].createdAt
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              : "No scans"
          }
          color="#7C6FF0"
        />

        <TimelineItem
          icon={BarChart3}
          title="Resume Analyses"
          value={`${dashboard?.totalScans ?? 0} Completed`}
          color="#3DD9C5"
        />
      </div>

    </div>
  );
}

export default OverviewTab;