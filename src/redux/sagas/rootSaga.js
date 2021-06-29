import { takeLatest } from "@redux-saga/core/effects";
import { GET_TASK, GET_SINGLE_TASK,DELETE_TASK,EDIT_TASK } from '../reducers/tasks';
import { handleGetTasks, handleGetSingleTasks, handleDleteTasks,handleEditTask } from './handlers/tasks';

export function* watcherSaga() {
    yield takeLatest(GET_TASK,handleGetTasks)
    yield takeLatest(GET_SINGLE_TASK, handleGetSingleTasks)
    yield takeLatest(DELETE_TASK,handleDleteTasks);
    yield takeLatest(EDIT_TASK, handleEditTask);
}