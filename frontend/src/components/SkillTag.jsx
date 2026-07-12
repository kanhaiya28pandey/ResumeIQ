function SkillTag({ skill, matched }) {
  return (
    <span
      className="text-xs px-3 py-1.5 rounded-full"
      style={{
        background: matched ? "rgba(79, 209, 168, 0.12)" : "rgba(240, 128, 128, 0.12)",
        color: matched ? "var(--success)" : "var(--danger)",
      }}
    >
      {skill}
    </span>
  );
}

export default SkillTag;