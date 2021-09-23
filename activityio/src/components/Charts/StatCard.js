const StatCard = ({ value, caption, unit }) => {
  return (
    <div
      className="shadow-md rounded-md h-24 lg:h-full lg:block lg:mt-0 mt-2 w-1/2 lg:w-full"
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
      <div className="h-1/5 flex justify-center items-center  text-xs whitespace-pre md:text-base z-50 overflow-y-visible ">
        <span className="mb-2 overflow-x-hidden">{caption}</span>
      </div>
    </div>
  );
};

export default StatCard;
