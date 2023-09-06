/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
const Piechart = ({ label, dataBody }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: label,
    datasets: [
      {
        label: "Number of subscribers ",
        data: dataBody,
        backgroundColor: [
          "rgba(255, 99, 132, 0.9 )",
          "rgba(54, 162, 235, 0.9)",
          "rgba(255, 206, 86, 0.9)",
          "#83ffa2d9",
          "rgba(153, 102, 255, 0.9)",
          "rgba(255, 159, 64, 0.9)",
        ],
        width: "200px",
        borderRadius: 10,
        spacing: 10,
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "#83ffa2d9",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
    options: {
      cutout: 95,
    },
  };

  return <Doughnut data={data} options={data.options} />;
};

export default Piechart;
