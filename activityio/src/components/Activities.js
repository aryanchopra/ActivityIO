import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteActivity } from "../reducers/activityReducer";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import EditActivity from "./EditActivity";

const Activities = () => {
  const dispatch = useDispatch();
  const Activities = useSelector((state) =>
    state.activities.sort((a, b) => {
      let firstdate = new Date(a.date.substr(0, 10));
      let seconddate = new Date(b.date.substr(0, 10));
      return seconddate - firstdate;
    })
  );
  console.log(Activities);
  const match = useRouteMatch("/activities/:id");
  const id = match ? match.params.id : null;
  const matchedactivity = Activities.find((activity) => activity.id === id);
  const activityDelete = (id) => {
    dispatch(deleteActivity(id));
  };
  return (
    <Switch>
      <Route path="/activities/:id">
        {matchedactivity && <EditActivity activity={matchedactivity} />}
      </Route>
      <Route path="">
        <div className="font-bold">
          {Activities.length === 0 && <span>No activities available</span>}
          {Activities.map((activity) => {
            return (
              <div key={activity.id}>
                {new Date(
                  new Date(activity.date).toLocaleDateString()
                ).toDateString()}
                <button
                  className="bg-red-300 mx-2 py-2 px-4 font-bold rounded-md"
                  onClick={() => activityDelete(activity.id)}
                >
                  Delete
                </button>
                <Link to={`activities/${activity.id}`}>
                  <button className="bg-yellow-300 py-2 px-4 font-bold rounded-md">
                    Edit
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </Route>
    </Switch>
  );
};

export default Activities;
