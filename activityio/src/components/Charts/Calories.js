import { Bar } from "react-chartjs-2";
import { YlGnBu7 as theme } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

const Calories = ({ data }) => {
  const chartData = {
    labels: data.map((activity) => activity.date.toDateString().slice(0, -5)),
    datasets: [
      {
        label: "Calories",
        data: data.map((activity) => activity.calories),
        yAxisID: "y",
        backgroundColor: "rgb(255, 97, 97 )",
        borderRadius: 2.5,
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
            text: "Calories Burnt",
            color: "Black",
            font: { weight: "bold", family: "montserrat" },
            position: "bottom",
          },
        },
      }}
    />
  );
};

export default Calories;
