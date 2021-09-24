import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import projectReducer from "./reducers/projectReducer";
import activityReducer from "./reducers/activityReducer";
import oauthReducer from "./reducers/oauthReducer";
import googlefitReducer from "./reducers/googlefitReducer";
import themeReducer from "./reducers/themeReducer";

const reducers = combineReducers({
  user: userReducer,
  projects: projectReducer,
  activities: activityReducer,
  googleUser: oauthReducer,
  googleFitData: googlefitReducer,
  darkMode: themeReducer,
});
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
