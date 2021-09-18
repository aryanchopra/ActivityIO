import { useSelector } from "react-redux";
import { Chart } from "react-chartjs-2";
import GridChartItem from "./GridChartItem";
import SleepQsleep from "./Charts/SleepQsleep";
import ProductivityQDay from "./Charts/ProductivityQDay";
import Projectpie from "./Charts/ProjectPie";
import Stats from "./Charts/Stats";
import { useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
const Statistics = () => {
  const [filter, setFilter] = useState(30);
  const activitydata = useSelector(
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
  const projectdata = useSelector((state) => state.projects);
  Chart.register(ChartDataLabels);
  if (activitydata.length === 0 || !activitydata || !projectdata) {
    console.log(activitydata, projectdata);
    return <h2>No activities logged yet</h2>;
  } else {
    return (
      <>
        <div className="lg:h-1/6">
          <h1>Your Weekly Stats</h1>
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
            checked={filter === 30 ? true : false}
          />
          <label htmlFor="month">Month</label>
        </div>

        <div className="h-screen lg:h-5/6 lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-2 pb-4 pr-4">
          <GridChartItem>
            <SleepQsleep data={activitydata} />
          </GridChartItem>
          <GridChartItem>
            <ProductivityQDay data={activitydata} />
          </GridChartItem>
          {projectdata.length > 0 && (
            <GridChartItem>
              <Projectpie data={projectdata} />
            </GridChartItem>
          )}
          <GridChartItem classes="flex flex-col items-center lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:gap-5 lg:m-0 mt-2">
            <Stats data={{ activitydata, projectdata, filter }} />
          </GridChartItem>
        </div>
      </>
    );
  }
};

export default Statistics;
