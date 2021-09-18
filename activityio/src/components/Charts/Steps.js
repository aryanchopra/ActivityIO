import { Bar } from "react-chartjs-2";
import { YlGnBu7 as theme } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

const Steps = ({ data }) => {
  const chartData = {
    labels: data.map((activity) => activity.date.toDateString().slice(0, -5)),
    datasets: [
      {
        label: "Steps",
        data: data.map((activity) => activity.steps),
        yAxisID: "y",
        borderRadius: 3,
        backgroundColor: "rgb(0,244,244)",
        tension: 0.2,
        datalabels: {
          labels: {
            title: null,
          },
        },
      },
    ],
  };
  return (
    <Bar
      data={chartData}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Steps",
            color: "Black",
            font: { weight: "bold", family: "montserrat" },
            position: "bottom",
          },
        },
      }}
    />
  );
};

export default Steps;
