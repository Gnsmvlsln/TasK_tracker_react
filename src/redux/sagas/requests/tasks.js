import axios from 'axios';

const headers = {
        'Authorization': "Bearer " + sessionStorage.getItem("token"),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

export const requestGettask = () => {
    return axios.get(`https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
}

export const requestAddTask = (payload) => {
return axios.post('https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38',payload.payload, {
    headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}).then(response => console.log('Obj',response));
}

export const requestGetSingletask = (payload) => {
    return axios.get(`https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${payload}`,{
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
};

export const requestEditTask = (payload,id) => {
    return axios.put(`https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${id}`,payload, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    }

export const requestDeletetask = (payload) => {
    return axios.delete(`https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${payload}`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
};