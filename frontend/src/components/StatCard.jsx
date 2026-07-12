function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div
      className="p-5 rounded-2xl animate-fade-in-up"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
        style={{ background: `${color}22` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>{label}</p>
      <p className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>{value}</p>
    </div>
  );
}

export default StatCard;