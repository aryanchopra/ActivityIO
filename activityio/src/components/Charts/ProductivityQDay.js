import { Line } from "react-chartjs-2";

const ProductivityQDay = ({ data }) => {
  console.log("chartdata", data);
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
        borderColor: ["Red"],
        backgroundColor: data.map((activity) =>
          activity.meditate ? "Cyan" : "Red"
        ),
        tension: 0.2,
        datalabels: {
          labels: {
            title: {
              formatter: function (value, context) {
                console.log(context);
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
        borderColor: "Pink",
        backgroundColor: "rgba()",
        tension: 0.2,
      },
      {
        label: "Workout",
        type: "bar",
        data: data.map((activity) => activity.workout),
        yAxisID: "y",
        borderWidth: 3,
        borderRadius: 3,
        borderColor: "Pink",
        backgroundColor: "rgba()",
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
        onClick: function (e) {
          console.log(e);
        },
        plugins: {
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
                console.log(item);
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
