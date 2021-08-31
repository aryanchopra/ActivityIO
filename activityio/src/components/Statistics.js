import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import GridChartItem from "./GridChartItem";
import SleepQsleep from "./Charts/SleepQsleep";
const Statistics = () => {
  const data = useSelector((state) =>
    state.activities.sort((a, b) => {
      let firstdate = new Date(a.date.substr(0, 10));
      let seconddate = new Date(b.date.substr(0, 10));
      return firstdate - seconddate;
    })
  );
  if (!data) {
    console.log(data);
    return <h2>No activities logged yet</h2>;
  } else {
    return (
      <div className="border-blue-800 lg:h-4/5 grid grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 border-8 ">
        <GridChartItem>
          <SleepQsleep data={data} />
        </GridChartItem>
        <div className="min-w-0">
          <div className="w-full h-full"></div>
        </div>
        <div className="min-w-0">
          <div className="w-full h-full"></div>
        </div>
        <div className="min-w-0">
          <div className="w-full h-full"></div>
        </div>
      </div>
    );
  }
};

export default Statistics;
