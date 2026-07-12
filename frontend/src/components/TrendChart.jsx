import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

function TrendChart({ data }) {
  const chartData = {
    labels: data.map((d) => new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })),
    datasets: [
      {
        label: "Match Score",
        data: data.map((d) => d.matchScore),
        borderColor: "#7c6ff0",
        backgroundColor: "rgba(124, 111, 240, 0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#7c6ff0",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: "#1a1f2f" }, ticks: { color: "#8b8fa3" } },
      y: { grid: { color: "#1a1f2f" }, ticks: { color: "#8b8fa3" }, min: 0, max: 100 },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default TrendChart;