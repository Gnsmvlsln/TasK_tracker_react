import { call, put } from "redux-saga/effects";
import { add_task,get_a_task,delete_a_task,edit_a_task } from "../../reducers/tasks";
import { requestGettask, requestGetSingletask, requestDeletetask,requestEditTask } from "../requests/tasks";

export function* handleGetTasks(action) {
  try {
    const response = yield call(requestGettask);
    const { data } = response;
    yield put(add_task(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetSingleTasks(action) {
    try {
      const response = yield call(requestGetSingletask,action.payload.payload);
      const { data } = response;
      yield put(get_a_task(data));
    } catch (error) {
      console.log(error);
    }
  }

export function* handleDleteTasks(action){
  try {
    const response = yield call(requestDeletetask,action.payload.payload);
    const { data } = response;
    yield put(delete_a_task(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleEditTask(action){
  try {
    const response = yield call(requestEditTask,action.payload.payload,action.payload.taskId);
    const { data } = response;
    yield put(edit_a_task(data));
  } catch (error) {
    console.log(error);
  }
}
