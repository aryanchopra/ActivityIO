const GridChartItem = (props) => {
  return (
    <div className="min-w-0">
      <div
        className={
          props.classes
            ? `w-full lg:h-full ${props.classes}`
            : "w-full lg:min-h-full min-h-270 lg:h-full rounded-md shadow-md"
        }
        // style={{ minHeight: "270px" }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default GridChartItem;
