import { PolarArea } from "react-chartjs-2";
// import "chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes";
// import colorschemes from "chartjs-plugin-colorschemes/src/colorschemes/";
const Projectpie = ({ data }) => {
  console.log(data);
  const chartData = {
    labels: data.map((project) => project.name),
    datasets: [
      {
        label: "Hours",
        data: data.map((project) => project.hours),
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
          colorschemes: {
            scheme: "colorschemes.brewer.Paired12",
          },
        },
      }}
    />
  );
};

export default Projectpie;
