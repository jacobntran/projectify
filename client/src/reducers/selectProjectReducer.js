import { FETCH_PROJECT, ADD_TASK, EDIT_TASK, ADD_CHAT } from "../actions/types";



export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECT:
      return { ...action.payload };
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };

    case ADD_CHAT:
      return { ...state, chat: [...state.chat, action.payload] };

    case EDIT_TASK:
      state.tasks.find(task => task._id === action.payload.taskId).status = action.payload.status;
      return { ...state, tasks: [...state.tasks] };

    default:
      return state;
  }
};
