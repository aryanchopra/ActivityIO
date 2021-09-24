import StatCard from "./StatCard";

const Stats = ({ data }) => {
  console.log(data);
  const timeline = data.filter === 30 ? "month" : "week";
  const averagesleep =
    Math.round(
      (data.activitydata.reduce((prev, curr) => {
        return prev + curr.sleep;
      }, 0) /
        data.activitydata.length) *
        100
    ) / 100;

  const averagequalityofday =
    Math.round(
      (data.activitydata.reduce((prev, curr) => {
        return prev + curr.qualityofday;
      }, 0) /
        data.activitydata.length) *
        100
    ) / 100;

  //Productivity score per day = productive hours /( 24 - Amount of sleep that day)

  const averageproductivity =
    Math.round(
      (data.activitydata.reduce((prev, curr) => {
        return prev + curr.productivehours / (24 - curr.sleep);
      }, 0) /
        data.activitydata.length) *
        100
    ) / 100;

  const averageprojecthours =
    Math.round(
      (data.activitydata.reduce((prev, curr) => {
        return curr.project ? prev + curr.project.hours : prev;
      }, 0) /
        data.activitydata.length) *
        100
    ) / 100;

  return (
    <>
      <StatCard
        value={averagesleep}
        caption={`Avg. sleep last ${timeline}`}
        unit="hrs"
      />
      <StatCard
        value={averagequalityofday}
        caption={`Avg. quality of day last ${timeline}`}
        unit="/ 10"
      />
      <StatCard
        value={averageproductivity}
        caption={`Avg. productivity last ${timeline}`}
        unit="/ 1"
      />
      <StatCard
        value={averageprojecthours}
        unit="hrs"
        caption={`Avg. project work last ${timeline}`}
      />
    </>
  );
};

export default Stats;
