import { PolarArea } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { SetThree11 as theme } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";
const Projectpie = ({ data }) => {
  const darkMode = useSelector((state) => state.darkMode);
  const chartData = {
    labels: data.map((project) => project.name),
    datasets: [
      {
        label: "Hours",
        data: data.map((project) => project.hours),
        backgroundColor: theme.map((color) => color),
      },
    ],
  };
  return (
    <PolarArea
      data={chartData}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        onClick: function (e) {},
        plugins: {
          title: {
            display: true,
            text: "Project Summary",
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
          colorschemes: {
            scheme: "colorschemes.brewer.Paired12",
          },
        },
      }}
    />
  );
};

export default Projectpie;
