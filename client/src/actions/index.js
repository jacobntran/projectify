import { v4 as uuid } from 'uuid';
import axios from 'axios';

//use variables for action types to prevent typos
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_PROJECT,
  FETCH_PROJECTS,
  FETCH_PROJECT,
  ADD_TASK,
  ADD_CHAT,
  EDIT_TASK,
  SET_REDIRECT_URL,
  REMOVE_NOTIFICATION,
} from './types';

// google auth
export const signIn = (googleId, googleName) => async (dispatch) => {
  const user = {
    _id: googleId,
    name: googleName,
  };

  const response = await axios.post('/user/new', user);

  const { _id: userId, name, notifications } = response.data;

  dispatch({
    type: SIGN_IN,
    payload: { userId, name, notifications },
  });
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// to add a new project to the state
export const createProject = (projectInfo) => async (dispatch, getState) => {
  //generate id for new project
  const _id = uuid();

  //get current user id
  const { userId } = getState().auth;

  const project = { ...projectInfo, _id, users: [userId], chat: [], tasks: [] };

  const response = await axios.post('/project/new', project);

  //dispatch created project to state
  dispatch({
    type: CREATE_PROJECT,
    payload: response.data,
  });
};

//get ALL projects associated with user
export const fetchProjects = (id) => async (dispatch) => {
  //fetch data using user id
  const { data } = await axios.get(`/${id}/project/all/`);

  dispatch({
    type: FETCH_PROJECTS,
    payload: data,
  });
};

//get a single project -- will go under Selected project reducer/state
export const fetchProject = (id) => async (dispatch) => {
  //fetch data using project id
  const { data } = await axios.get(`/project/${id}`);

  dispatch({
    type: FETCH_PROJECT,
    payload: data,
  });
};

// add a single task to a single project
export const addTask = (projectId, task) => async (dispatch) => {
  //asign task an id
  const taskWithId = { ...task, _id: uuid() };

  //update project on back end with new task
  await axios.put(`/project/${projectId}/task/new`, taskWithId);

  //update state with new task
  dispatch({
    type: ADD_TASK,
    payload: taskWithId, //add id to task
  });
};

// add a single chat message to state
export const addChat = (chat) => {
  return {
    type: ADD_CHAT,
    payload: chat,
  };
};

export const editTask = (projectId, taskId, status) => async (dispatch) => {
  //update project on back end with edited task
  await axios.put(`/project/${projectId}/task/edit/${taskId}`, {
    status: status,
  });

  //update state with edited task
  dispatch({
    type: EDIT_TASK,
    payload: {
      taskId: taskId,
      status: status,
    },
  });
};

export const setRedirectUrl = (redirectURL) => async (dispatch) => {
  dispatch({
    type: SET_REDIRECT_URL,
    payload: {
      redirectURL: redirectURL,
    },
  });
};

export const removeNotification = (notificationID) => {
  return {
    type: REMOVE_NOTIFICATION,
    payload: notificationID,
  };
};
