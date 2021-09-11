import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { YlGnBu7 as theme } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

const SleepQsleep = ({ data }) => {
  const chartData = {
    labels: data.map((activity) =>
      new Date(activity.date).toDateString().slice(0, -5)
    ),
    datasets: [
      {
        label: "Quality of Sleep",
        data: data.map((activity) => activity.qualityofsleep),
        yAxisID: "y",
        borderWidth: 3,
        borderRadius: 3,
        borderColor: theme[0],
        backgroundColor: "Yellow",
        tension: 0.2,
        datalabels: {
          labels: {
            title: null,
          },
        },
      },
      {
        label: "Sleep",
        type: "bar",
        data: data.map((activity) => activity.sleep),
        yAxisID: "y",
        borderWidth: 3,
        borderRadius: 3,
        borderColor: theme[2],
        backgroundColor: "Turquoise",
        tension: 0.2,
      },
    ],
  };
  return (
    <Line
      data={chartData}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Sleep and Quality of Sleep",
            color: "Black",
            font: { weight: "bold", family: "montserrat" },
            position: "bottom",
          },
        },
      }}
    />
  );
};

export default SleepQsleep;
