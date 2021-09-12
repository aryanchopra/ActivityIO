import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteActivity } from "../reducers/activityReducer";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import EditActivity from "./EditActivity";
import Paginator from "./Paginator";
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
        <div>
          {Activities.length === 0 && <span>No activities available</span>}
          <table class="border-collapse border-4 rounded-md border-green-800 ...">
            <thead>
              <tr>
                <th class="border ">Date</th>
                {/* <th class="border ">City</th>
                <th class="border ">City</th> */}
              </tr>
            </thead>
            <tbody>
              {shownActivities.map((activity) => {
                return (
                  <tr key={activity.id}>
                    <td>
                      {new Date(
                        new Date(activity.date).toLocaleDateString()
                      ).toDateString()}
                    </td>
                    <td>
                      <button
                        className="bg-red-300 mx-2 py-2 px-4 font-bold rounded-md"
                        onClick={() => activityDelete(activity.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link to={`activities/${activity.id}`}>
                        <button className="bg-yellow-300 py-2 px-4 font-bold rounded-md">
                          Edit
                        </button>
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
      </Route>
    </Switch>
  );
};

export default Activities;
