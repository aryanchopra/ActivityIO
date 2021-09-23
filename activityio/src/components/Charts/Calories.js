import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
const Calories = ({ data }) => {
  const darkMode = useSelector((state) => state.darkMode);
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
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: darkMode ? "White" : "Black",
            },
          },
          x: {
            ticks: {
              color: darkMode ? "White" : "Black",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Calories Burnt",
            color: darkMode ? "White" : "Black",
            font: { weight: "bold", family: "montserrat" },
            position: "bottom",
          },
          legend: {
            labels: {
              color: darkMode ? "White" : "Black",
            },
          },
        },
      }}
    />
  );
};

export default Calories;
