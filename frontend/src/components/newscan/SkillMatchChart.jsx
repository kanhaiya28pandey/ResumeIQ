import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, } from "recharts";

function SkillMatchChart({ matchedSkills = [], missingSkills = [] }) {
  const data = [
    {
      name: "Matched",
      value: matchedSkills.length,
      color: "var(--success)",
    },
    {
      name: "Missing",
      value: missingSkills.length,
      color: "var(--danger)",
    },
  ];

  return (
  <div className="h-full">
    <h3
      className="text-lg font-semibold mb-2"
      style={{ color: "var(--text-primary)" }}
    >
      Skill Match
    </h3>

    <p
      className="text-sm mb-4"
      style={{ color: "var(--text-secondary)" }}
    >
      Matched vs Missing Skills
    </p>

    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={95}
            innerRadius={55}
            paddingAngle={5}
          >
            {data.map((item) => (
              <Cell
                key={item.name}
                fill={item.color}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);
}

export default SkillMatchChart;