import { Line } from "react-chartjs-2";
import { Infusion6 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office";
const ProductivityQDay = ({ data }) => {
  console.log(Infusion6);
  console.log("chartdata", data);
  console.log();
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
        onClick: (e) => {
          console.log(e);
        },
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

        plugins: {
          colorschemes: {
            scheme: "Infusion6",
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          title: {
            display: true,
            text: "Productivity, Workouts and Quality of Day",
            color: "Black",
            font: { weight: "bold" },
            position: "bottom",
          },
          legend: {
            labels: {
              filter: function (item, chart) {
                return !item.text.includes("ID");
              },
            },
          },
        },
      }}
    />
  );
};

export default ProductivityQDay;
