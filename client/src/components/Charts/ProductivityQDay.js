import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Infusion6 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office";
const ProductivityQDay = ({ data }) => {
  const darkMode = useSelector((state) => state.darkMode);
  const chartData = {
    labels: data.map((activity) =>
      new Date(activity.date).toDateString().slice(0, -5)
    ),
    datasets: [
      {
        label: "ID",
        data: data.map((activity) => activity.id),
      },
      {
        label: "Quality of Day",
        data: data.map((activity) => activity.qualityofday),
        yAxisID: "y",
        borderWidth: 1,
        borderRadius: 6,
        borderColor: Infusion6[3],
        backgroundColor: data.map((activity) =>
          activity.meditate ? "Cyan" : "LightPink"
        ),
        tension: 0.2,
        datalabels: {
          labels: {
            title: {
              formatter: function (value, context) {
                return data[context.dataIndex].meditate
                  ? context.chart.data.labels.length < 10
                    ? "Meditated"
                    : "Med."
                  : null;
              },
              //   anchor: "start",

              color: darkMode ? "White" : "Black",
              clamp: true,
              align: "bottom",
              offset: 1,
            },
          },
        },
      },
      {
        label: "Productivity",
        type: "bar",
        data: data.map((activity) => activity.productivehours),
        yAxisID: "y",
        borderWidth: 3,
        borderRadius: 3,
        borderColor: "DarkGreen",
        backgroundColor: Infusion6[1],
        tension: 0.2,
      },
      {
        label: "Workout",
        type: "bar",
        data: data.map((activity) => activity.workout),
        yAxisID: "y",
        borderWidth: 3,
        borderRadius: 3,
        borderColor: Infusion6[3],
        backgroundColor: Infusion6[2],
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
        onClick: function (e) {},
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
          colorschemes: {
            scheme: "Infusion6",
          },

          title: {
            display: true,
            text: "Productivity, Workouts and Quality of Day",
            color: darkMode ? "White" : "Black",
            font: { weight: "bold", family: "Inter" },
            position: "bottom",
          },
          legend: {
            labels: {
              filter: function (item, chart) {
                return !item.text.includes("ID");
              },
              color: darkMode ? "White" : "Black",
            },
          },
          datalabels: {
            color: darkMode ? "Red" : "Black",
          },
        },
      }}
    />
  );
};

export default ProductivityQDay;
