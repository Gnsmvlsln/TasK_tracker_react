import './App.css';
import { Tasks } from './components/Tasks';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { get_task } from "./redux/reducers/tasks";

function App() {

  const [dropdown, setDropdown] = useState([]);
  const [tok, setToken] = useState();
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
       setToken(response.data.results.token)
       requestUser();
      requestUserdropdown();
    })
}
  useEffect(() => {
    requestLogin();
    // requestUserdropdown();
    dispatch(get_task());
  // eslint-disable-next-line no-use-before-define
  requestUserdropdown();
  },[])


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
const requestUserdropdown = async () => {
  const tokVal = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : tok;
  await axios.get(`https://stage.api.sloovi.com/team`, {
    headers: {
      'Authorization': 'Bearer ' +  tokVal,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((data) => {
    sessionStorage.setItem('dropdownList',data.data.results.data)
    setDropdown(data.data.results.data)
})
}

  return (
    <div className="App">
      {/* <div> */}
        <div className="header-bar">
          </div>
      <div>
        <Tasks dropdown={dropdown}/></div>
     </div>
  );
}

export default App;
