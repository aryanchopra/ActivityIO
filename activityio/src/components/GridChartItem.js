const GridChartItem = (props) => {
  return (
    <div className="min-w-0">
      <div
        className={
          props.classes
            ? `w-full h-full ${props.classes}`
            : "w-full h-full rounded-md shadow-md"
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default GridChartItem;
