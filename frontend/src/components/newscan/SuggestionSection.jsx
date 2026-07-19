import { useState } from "react";
import { ChevronDown, ChevronRight, AlertTriangle, Info, Lightbulb, } from "lucide-react";

function SuggestionSection({ suggestions = [] }) {
  const [open, setOpen] = useState(0);
  const getPriority = (index) => {
    if (index === 0) return "High";
    if (index <= 2) return "Medium";
    return "Low";
  };

  const getColor = (priority) => {
    switch (priority) {
      case "High":
        return "var(--danger)";
      case "Medium":
        return "var(--warning)";
      default:
        return "var(--success)";
    }
  };

  const getIcon = (priority) => {
    switch (priority) {
      case "High":
        return <AlertTriangle size={18} />;
      case "Medium":
        return <Info size={18} />;
      default:
        return <Lightbulb size={18} />;
    }
  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <h2
        className="text-2xl font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        AI Recommendations
      </h2>

      <p
        className="mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        Focus on the highest-priority improvements first.
      </p>

      <div className="space-y-3">
        {suggestions.map((item, index) => {
          const priority = getPriority(index);

          return (
            <div
              key={index}
              className="rounded-xl overflow-hidden"
              style={{
                border: "1px solid var(--border-divider)",
              }}
            >
              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      color: getColor(priority),
                    }}
                  >
                    {getIcon(priority)}
                  </div>

                  <div>
                    <div
                      className="font-semibold"
                      style={{
                        color: "var(--text-primary)",
                      }}
                    >
                      {priority} Priority
                    </div>

                    <div
                      className="text-sm"
                      style={{
                        color: "var(--text-secondary)",
                      }}
                    >
                      Recommendation {index + 1}
                    </div>
                  </div>
                </div>

                {open === index ? (
                  <ChevronDown />
                ) : (
                  <ChevronRight />
                )}
              </button>

              {open === index && (
                <div
                  className="px-4 pb-4"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {item}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SuggestionSection;