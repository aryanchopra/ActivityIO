import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import projectReducer from "./reducers/projectReducer";
import activityReducer from "./reducers/activityReducer";
const reducers = combineReducers({
  user: userReducer,
  projects: projectReducer,
  activities: activityReducer,
});
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
