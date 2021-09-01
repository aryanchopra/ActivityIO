import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

const SleepQsleep = ({ data }) => {
  const chartData = {
    labels: data.map((activity) =>
      new Date(activity.date).toDateString().slice(0, -5)
    ),
    datasets: [
      {
        label: "Sleep",
        data: data.map((activity) => activity.sleep),
        yAxisID: "y",
        borderWidth: 3,
        borderRadius: 3,
        borderColor: "Pink",
        backgroundColor: "rgba()",
        tension: 0.2,
      },
      {
        label: "Quality of Sleep",
        data: data.map((activity) => activity.qualityofsleep),
        yAxisID: "y",
        borderWidth: 3,
        borderRadius: 3,
        borderColor: "Yellow",
        backgroundColor: "Green",
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
            text: "Sleep vs Quality of Sleep",
            color: "Black",
            font: { weight: "bold" },
            position: "bottom",
          },
        },
      }}
    />
  );
};

export default SleepQsleep;
