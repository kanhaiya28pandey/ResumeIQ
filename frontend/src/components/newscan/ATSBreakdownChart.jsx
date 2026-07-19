import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, } from "recharts";

function ATSBreakdownChart({
  matchScore,
  atsScore,
  atsBreakdown,
}) {
  const data = atsBreakdown
    ? [
      {
        name: "Contact",
        score: atsBreakdown.contact,
      },
      {
        name: "Sections",
        score: atsBreakdown.sections,
      },
      {
        name: "Format",
        score: atsBreakdown.formatting,
      },
      {
        name: "Length",
        score: atsBreakdown.length,
      },
      {
        name: "Skills",
        score: atsBreakdown.skills,
      },
      {
        name: "Content",
        score: atsBreakdown.content,
      },
    ]
    : [
      {
        name: "Match",
        score: matchScore,
      },
      {
        name: "ATS",
        score: atsScore,
      },
    ];

  return (
    <div className="h-full">

      <h3
        className="text-lg font-semibold mb-2"
        style={{
          color: "var(--text-primary)",
        }}
      >
        ATS Breakdown
      </h3>

      <p
        className="text-sm mb-4"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        Detailed ATS scoring by category
      </p>

      <div
        style={{
          width: "100%",
          height: 320,
        }}
      >
        <ResponsiveContainer>

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis domain={[0, 30]} />

            <Tooltip />

            <Bar
              dataKey="score"
              radius={[8, 8, 0, 0]}
            >

              {data.map((entry, index) => {

                let color = "var(--accent)";

                if (entry.score >= 20)
                  color = "var(--success)";
                else if (entry.score >= 10)
                  color = "var(--warning)";
                else
                  color = "var(--danger)";

                return (
                  <Cell
                    key={index}
                    fill={color}
                  />
                );

              })}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ATSBreakdownChart;