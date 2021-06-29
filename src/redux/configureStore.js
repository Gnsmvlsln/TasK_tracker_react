import { combineReducers, createStore, applyMiddleware } from 'redux';
import tasksReducer from "./reducers/tasks";
import createSagaMiddleware from '@redux-saga/core';
import { watcherSaga } from '../redux/sagas/rootSaga'

const reducers = combineReducers({
    tasks : tasksReducer
})

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducers, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga)

export default store;