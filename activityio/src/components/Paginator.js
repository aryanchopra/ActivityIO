const Paginator = ({
  activitiesperpage,
  totalactivities,
  paginate,
  currentpage,
}) => {
  let totalpages = [];
  for (let i = 0; i < Math.ceil(totalactivities / activitiesperpage); i++) {
    totalpages.push(i + 1);
  }
  console.log(totalactivities);
  return (
    <div className="mt-3">
      {totalpages.length > 1 &&
        totalpages.map((page) => {
          return (
            <div
              onClick={() => paginate(page)}
              className={
                page === currentpage
                  ? "inline-block border-2 border-red-400 rounded-md w-8 text-center mx-1 cursor-pointer"
                  : "inline-block border-2 border-blue-400 rounded-md w-8 text-center mx-1 cursor-pointer"
              }
            >
              {" "}
              {page}{" "}
            </div>
          );
        })}
    </div>
  );
};

export default Paginator;
