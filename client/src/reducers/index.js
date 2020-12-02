import { combineReducers } from "redux";
import authReducer from "./authReducer";
import projectsReducer from "./projectsReducer";
import selectProjectReducer from "./selectProjectReducer";

export default combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  selectProject: selectProjectReducer,
});
