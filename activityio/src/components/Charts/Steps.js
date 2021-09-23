import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

const Steps = ({ data }) => {
  const darkMode = useSelector((state) => state.darkMode);
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
            text: "Steps",
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

export default Steps;
