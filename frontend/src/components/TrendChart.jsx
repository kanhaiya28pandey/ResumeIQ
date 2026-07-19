import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

function TrendChart({ data }) {
  const labels = data.map((item) =>
    new Date(item.date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
      }
    )
  );

  const chartData = {

    labels,
    datasets: [
      {
        label: "Match Score",
        data: data.map(
          (item) => item.matchScore
        ),
        fill: true,
        borderWidth: 3,
        tension: 0.45,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBorderWidth: 2,
        borderColor: "#7C6FF0",
        pointBorderColor: "#7C6FF0",
        pointBackgroundColor: "#ffffff",

        backgroundColor(context) {
          const chart = context.chart;
          const { ctx, chartArea, } = chart;

          if (!chartArea) return null;
          const gradient =
            ctx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );

          gradient.addColorStop(
            0,
            "rgba(124,111,240,0.35)"
          );

          gradient.addColorStop(
            1,
            "rgba(124,111,240,0)"
          );

          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor:
          "#1F2335",
        borderColor:
          "#7C6FF0",
        borderWidth: 1,
        displayColors: false,
        padding: 12,
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        callbacks: {
          label(context) {
            return `Match Score : ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#8B8FA3",
          maxRotation: 0,
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "#8B8FA3",
        },
        grid: {
          color: "rgba(139,143,163,0.12)",
        },
      },
    },
    animation: {
      duration: 1400,
    },
  };

  return (

    <div className="h-[340px]">
      <Line
        data={chartData}
        options={options}
      />
    </div>
  );
}

export default TrendChart;