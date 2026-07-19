import { Bar, } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function DomainChart({ data }) {
  const chartData = {
    labels: data.map(
      (d) => d.domain
    ),

    datasets: [
      {
        data: data.map(
          (d) => d.count
        ),

        backgroundColor:
          "#7C6FF0",

        borderRadius: 10,

        maxBarThickness: 40,

      },

    ],

  };

  const options = {

    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#8B8FA3",
        },

      },

      y: {
        beginAtZero: true,
        ticks: {
          color: "#8B8FA3",
          stepSize: 1,
        },

        grid: {
          color:
            "rgba(139,143,163,.12)",
        },

      },

    },

  };

  return (

    <div className="h-[260px]">

      <Bar
        data={chartData}
        options={options}
      />

    </div>

  );

}

export default DomainChart;