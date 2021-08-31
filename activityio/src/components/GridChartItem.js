const GridChartItem = (props) => {
  return (
    <div className="min-w-0">
      <div className="w-full h-full">{props.children}</div>
    </div>
  );
};

export default GridChartItem;
