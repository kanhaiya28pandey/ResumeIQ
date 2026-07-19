import { ArrowUpRight } from "lucide-react";

function StatCard({title, value, subtitle = "", icon: Icon, color = "#7C6FF0", }) {
  return (
    <div
      className="group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-sm font-medium"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {title}
          </p>

          <h2
            className="mt-2 text-3xl font-bold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {value}
          </h2>

          {subtitle && (
            <p
              className="mt-3 text-xs flex items-center gap-1"
              style={{
                color: "var(--text-muted)",
              }}
            >
              <ArrowUpRight
                size={14}
                style={{ color }}
              />

              {subtitle}
            </p>
          )}

        </div>

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: `${color}20`,
          }}
        >
          <Icon
            size={26}
            style={{
              color,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default StatCard;