/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const Barchart = ({ labels, power }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Power consumption of each Miners (w)",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: ["Power consumption (w)"],
        data: power,
        backgroundColor: [
          "rgba(255, 99, 132, 1 )",
          "#006d77",
          "#0067C1",
          "#0081a7",
        ],
        borderWidth: 1,
        borderRadius: 14,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default Barchart;
