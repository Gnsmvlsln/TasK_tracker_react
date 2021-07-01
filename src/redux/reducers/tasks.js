import { requestAddTask } from '../sagas/requests/tasks';

export const ADD_TASK = "add_task";
export const GET_TASK = "get_task";
export const ADD_NEW_TASK = "add_new_task";
export const EDIT_TASK = "edit_task"
export const GET_SINGLE_TASK = "get_single_task";
export const GET_A_TASK = "get_a_task";
export const DELETE_TASK = "delete_task";
export const DELETE_A_TASK = "delete_a_task";
export const EDIT_A_TASK = "edit_a_task";

export const add_task = (task) => ({
    type: ADD_TASK,
    task
})
export const get_task = () => ({
    type: GET_TASK
})

export const add_new_task = (payload) => ({
    type: ADD_NEW_TASK,
    payload
})

export const edit_task = (payload) => ({
    type: EDIT_TASK,
    payload
})

export const edit_a_task = (payload) => ({
    type: EDIT_A_TASK,
    payload
})

export const get_single_task = (payload) => ({
    type: GET_SINGLE_TASK,
    payload
})

export const get_a_task = (data) => ({
    type: GET_A_TASK,
    data
})

export const delete_task = (payload) => ({
    type: DELETE_TASK,
    payload
})

export const delete_a_task = (payload) => ({
    type: DELETE_A_TASK,
    payload
})


const initialState = {
    tasks: undefined
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_TASK:
            const {task} = actions
            return { ...state, task}
        case EDIT_A_TASK:
            const updateId = state.data.data.results.id;
            const newStatee = state.task.results.filter(task => task.id !== updateId);
            console.log('aaaaaaacccco',state,actions)
            return {...newStatee,actions};
        case ADD_NEW_TASK:
            requestAddTask(actions.payload);
            return state;
        case GET_A_TASK:
            const data  = actions
            return {...state, data};
        case DELETE_A_TASK:
            const deletedTaskId = state.data.data.results.id;
            const newState = state.task.results.filter(task => task.id !== deletedTaskId);
            return newState;
        default:
            return state;
    }
}