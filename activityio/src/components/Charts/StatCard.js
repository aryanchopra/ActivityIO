const StatCard = ({ value, caption, unit }) => {
  return (
    <div
      className="shadow-md rounded-md"
      style={{
        backgroundColor: "#4158D0",
        backgroundImage:
          "linear-gradient(317deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
      }}
    >
      <div className="h-4/5 flex justify-center items-center font-extrabold text-white text-2xl">
        <div className="flex items-baseline">
          {`${value} `}
          <span className="text-sm ml-1"> {unit}</span>
        </div>
      </div>
      <div className="h-1/5 flex justify-center items-center overflow-x-hidden text-xs whitespace-pre md:text-base">
        {caption}
      </div>
    </div>
  );
};

export default StatCard;
