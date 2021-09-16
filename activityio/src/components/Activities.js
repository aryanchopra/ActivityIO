import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteActivity } from "../reducers/activityReducer";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import EditActivity from "./EditActivity";
import Paginator from "./Paginator";
import { Edit, Delete } from "@material-ui/icons";

const Activities = () => {
  const dispatch = useDispatch();
  const Activities = useSelector((state) =>
    state.activities.sort((a, b) => {
      let firstdate = new Date(a.date.substr(0, 10));
      let seconddate = new Date(b.date.substr(0, 10));
      return seconddate - firstdate;
    })
  );
  const match = useRouteMatch("/activities/:id");
  const id = match ? match.params.id : null;
  const matchedactivity = Activities.find((activity) => activity.id === id);
  const activityDelete = (id) => {
    dispatch(deleteActivity(id));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage, setActivitiesPerPage] = useState(10);

  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const shownActivities = Activities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  return (
    <Switch>
      <Route path="/activities/:id">
        {matchedactivity && <EditActivity activity={matchedactivity} />}
      </Route>
      <Route path="">
        {Activities.length === 0 ? (
          <span>No activities available</span>
        ) : (
          <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="overflow-auto lg:overflow-visible ">
              <table
                className="table text-black text-sm border-separate "
                style={{ borderSpacing: "0px 2px" }}
              >
                <thead className="bg-gray-800 text-gray-500">
                  <tr className=" border-2" style={{ borderRadius: "20px" }}>
                    <th className="p-2 rounded-l-md">Date</th>
                    <th className="p-2 hidden md:table-cell">Sleep</th>
                    <th className="p-2 hidden md:table-cell">
                      Quality of Sleep
                    </th>
                    <th className="p-2 hidden md:table-cell">Quality Of Day</th>
                    <th className="p-2 hidden md:table-cell">Meditated</th>
                    <th className="p-2 hidden md:table-cell">Project</th>
                    <th className="p-2 rounded-r-md">Action</th>
                    {/* <th class="border ">City</th>
              <th class="border ">City</th> */}
                  </tr>
                </thead>
                <tbody className="space-y-6 ">
                  {shownActivities.map((activity) => {
                    return (
                      <tr key={activity.id} className="bg-gray-800 text-white">
                        <td className="p-3 rounded-l-md">
                          {new Date(
                            new Date(activity.date).toLocaleDateString()
                          ).toDateString()}
                        </td>
                        <td className="p-3 hidden md:table-cell text-center">
                          {activity.sleep}
                        </td>
                        <td className="p-3 hidden md:table-cell text-center">
                          {activity.qualityofsleep}
                        </td>
                        <td className="p-3 hidden md:table-cell text-center">
                          {activity.qualityofday}
                        </td>
                        <td className="p-3 hidden md:table-cell text-center">
                          {activity.meditate ? "Yes" : "No"}
                        </td>
                        <td className="p-3 hidden md:table-cell text-center">
                          {activity.project ? "Yes" : "No"}
                        </td>
                        <td className="p-2 rounded-r-md">
                          <Delete
                            className="cursor-pointer mr-2 hover:text-gray-500"
                            onClick={() => activityDelete(activity.id)}
                          />

                          <Link to={`activities/${activity.id}`}>
                            <Edit className="cursor-pointer mr-2 hover:text-gray-500" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Paginator
              activitiesperpage={activitiesPerPage}
              totalactivities={Activities.length}
              paginate={setCurrentPage}
              currentpage={currentPage}
            />
          </div>
        )}
      </Route>
    </Switch>
  );
};

export default Activities;
