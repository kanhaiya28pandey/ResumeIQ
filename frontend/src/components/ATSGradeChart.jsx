import { Doughnut, } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from "chart.js";

ChartJS.register( ArcElement, Tooltip, Legend );

function ATSGradeChart({ data, average, }) {

  const chartData = {
    labels: data.map(item => item.grade),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: [
          "#22C55E",
          "#7C6FF0",
          "#FACC15",
          "#FB7185",
        ],
        borderWidth: 0,

      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (

    <div className="flex flex-col items-center">
      <div
        className="relative"
        style={{
          width: 240,
          height: 240,
        }}
      >
        <Doughnut
          data={chartData}
          options={options}
        />

        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >

          <div
            className="text-4xl font-bold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {average}
          </div>

          <div
            className="text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Avg ATS
          </div>

        </div>

      </div>

      {/* Legend */}

      <div className="mt-6 w-full space-y-2">

        <div className="flex justify-between">

          <span>🟢 A - Excellent</span>

          <span>90-100</span>

        </div>

        <div className="flex justify-between">

          <span>🟣 B - Good</span>

          <span>75-89</span>

        </div>

        <div className="flex justify-between">

          <span>🟡 C - Fair</span>

          <span>60-74</span>

        </div>

        <div className="flex justify-between">

          <span>🔴 D - Needs Improvement</span>

          <span>&lt;60</span>

        </div>

      </div>

    </div>

  );

}

export default ATSGradeChart;