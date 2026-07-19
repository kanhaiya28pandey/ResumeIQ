import { CheckCircle2, XCircle, Target, Lightbulb, } from "lucide-react";
import StatCard from "../StatCard";

function StatsSection({
  matchedSkills,
  missingSkills,
  suggestions,
}) {
  return (
    <div className="grid grid-cols-1 gap-3 animate-fade-in-up">

      <StatCard
        title="Matched Skills"
        value={matchedSkills.length}
        icon={CheckCircle2}
        color="var(--success)"
      />

      <StatCard
        title="Missing Skills"
        value={missingSkills.length}
        icon={XCircle}
        color="var(--danger)"
      />

      <StatCard
        title="Required Skills"
        value={matchedSkills.length + missingSkills.length}
        icon={Target}
        color="var(--warning)"
      />

      <StatCard
        title="AI Suggestions"
        value={suggestions.length}
        icon={Lightbulb}
        color="var(--accent)"
      />

    </div>
  );
}

export default StatsSection;