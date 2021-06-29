import './App.css';
import { Tasks } from './components/Tasks';
import { useEffect } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { get_task } from "./redux/reducers/tasks";

function App() {

  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const requestLogin = async () => {
    await axios.post(`https://stage.api.sloovi.com/login`, {email : 'smithcheryl@yahoo.com',
    password : '12345678'}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => {
       sessionStorage.setItem('token',response.data.results.token);
       requestUser();
    })
}
  useEffect(() => {
    requestLogin();
    dispatch(get_task());
  // eslint-disable-next-line no-use-before-define
  },[dispatch, requestLogin])


const requestUser = async () => {
  const response = await axios.get(`https://stage.api.sloovi.com/user`, {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  sessionStorage.setItem('userId', response.data.results.user_id);
}
  return (
    <div className="App">
      <Tasks/>
    </div>
  );
}

export default App;
