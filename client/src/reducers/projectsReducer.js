import _ from "lodash";
import {
  CREATE_PROJECT,
  FETCH_PROJECTS,
  FETCH_PROJECT,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_PROJECTS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_PROJECT:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return { ...state };
  }
};
