import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import GridChartItem from "./GridChartItem";
import SleepQsleep from "./Charts/SleepQsleep";
import { useState } from "react";
const Statistics = () => {
  const [filter, setFilter] = useState(7);
  const data = useSelector(
    (state) =>
      state.activities
        .sort((a, b) => {
          let firstdate = new Date(a.date.substr(0, 10));
          let seconddate = new Date(b.date.substr(0, 10));
          return firstdate - seconddate;
        })
        .filter((activity) => {
          let activitydate = new Date(activity.date);
          let thresholddate = new Date();
          thresholddate.setDate(thresholddate.getDate() - filter);
          return (
            activitydate.getTime() > thresholddate.getTime() &&
            activitydate.getTime() < new Date().getTime()
          );
        })
    //   The filter ensures the activities returned by the useSelector are within the filter range selected
  );
  if (data.length === 0) {
    return <h2>No activities logged yet</h2>;
  } else {
    return (
      <>
        <div className="lg:h-1/5">
          <input
            type="radio"
            name="filter"
            onChange={() => setFilter(7)}
            id="week"
            checked={filter === 7 ? true : false}
          />
          <label htmlFor="week">Week</label>
          <input
            type="radio"
            id="month"
            name="filter"
            onChange={() => setFilter(30)}
          />
          <label htmlFor="month">Month</label>
        </div>

        <div className="border-blue-800 h-screen lg:h-4/5 grid grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 border-8 ">
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
      </>
    );
  }
};

export default Statistics;
