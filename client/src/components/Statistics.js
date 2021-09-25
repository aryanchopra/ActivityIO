import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Chart } from "react-chartjs-2";
import GridChartItem from "./GridChartItem";
import SleepQsleep from "./Charts/SleepQsleep";
import ProductivityQDay from "./Charts/ProductivityQDay";
import Projectpie from "./Charts/ProjectPie";
import Stats from "./Charts/Stats";

const Statistics = () => {
  const [filter, setFilter] = useState(30);
  let activitydata = useSelector((state) => state.activities);
  activitydata = activitydata
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
    });

  //   The filter ensures the activities returned by the useSelector are within the filter range selected
  const projectdata = useSelector((state) => state.projects);

  Chart.register(ChartDataLabels);
  if (activitydata.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="text-5xl">No activities logged yet.</span>
      </div>
    );
  } else if (!activitydata || !projectdata) {
    return <div>Loading..</div>;
  } else {
    return (
      <>
        <div className="lg:h-1/6">
          <div className="flex justify-center lg:justify-end items-end h-full">
            <span className="lg:text-6xl dark:text-gray-400 text-2xl font-bold mb-4">
              Your{" "}
              <span
                onClick={() => (filter === 7 ? setFilter(30) : setFilter(7))}
                className="cursor-pointer dark:text-gray-100 text-gray-600"
              >
                {filter === 7 ? "weekly" : "monthly"}
              </span>{" "}
              stats
            </span>
          </div>
          {/* <input
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
          <label htmlFor="month">Month</label> */}
        </div>

        <div className="lg:h-5/6 lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-2 pb-4 pr-4">
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
          <GridChartItem classes="flex flex-col items-center lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:gap-3 lg:m-0 mt-2">
            <Stats data={{ activitydata, projectdata, filter }} />
          </GridChartItem>
        </div>
      </>
    );
  }
};

export default Statistics;
