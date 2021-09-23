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
  return (
    <div className="mt-3">
      {totalpages.length > 1 &&
        totalpages.map((page, idx) => {
          return (
            <div
              onClick={() => paginate(page)}
              key={`${page}${idx}`}
              className={
                page === currentpage
                  ? "inline-block border-2 border-black dark:border-white dark:text-white rounded-md w-8 text-center mx-1 cursor-pointer"
                  : "inline-block border-2 border-gray-400 dark:text-white rounded-md w-8 text-center mx-1 cursor-pointer"
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
