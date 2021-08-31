import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import projectReducer from "./reducers/projectReducer";
import activityReducer from "./reducers/activityReducer";
import oauthReducer from "./reducers/oauthReducer";

const reducers = combineReducers({
  user: userReducer,
  projects: projectReducer,
  activities: activityReducer,
  googleUser: oauthReducer,
});
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
