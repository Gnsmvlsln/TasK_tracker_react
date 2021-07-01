import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import $ from 'jquery';
import {
  get_task,
  add_new_task,
  get_single_task,
  delete_task,
  edit_task
} from "../redux/reducers/tasks";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { FaPlus } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { TiDocumentText } from 'react-icons/ti';
import { FiCalendar } from 'react-icons/fi';
import { TiArrowUnsorted } from 'react-icons/ti';
import { FiClock } from 'react-icons/fi';
import { Times } from '../constants/constants'

import moment  from "moment";

const useOutsideAlerter =(ref)=> {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        var parentTimediv = document.getElementsByClassName('dropdownParent')[0];
        parentTimediv.style.display="none";
      }
  }
  document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
  })
}

export const Tasks = (Dropdata) => {
  // console.log('droooppppoooooiiii',data);
  const [dropdowndata, Setdata] = useState(Dropdata);
  // console.log('tooooo',Dropdata);
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const [toMap, setArray] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [singleUser, setSingleUser] = useState();
  const [editFlag, setEditFlag] = useState(false);
  const [time,setTime] = useState();
  const [taskCount,setArrayLength] = useState();
  const [user_name,setAssignUsr] = useState("");
  const [arrayTime,setTimeArray] = useState(Times);
  // const [setTimeddiv, setClickedTimediv] = useState(true);
  const wrapperRef = useRef(null)
  const dispatch = useDispatch();

  useOutsideAlerter(wrapperRef);

  const taskb = useSelector((state) => state.tasks.task);
  const editTask = useSelector((state) => state.tasks.data)
  const imagName = require('../assets/user1.png');

  useEffect(() => {
    setArrayLength(taskb &&  taskb.results ? taskb.results.length : 0);
    if (editTask !== undefined) {
      const data = editTask.data.results;
      setAssignUsr(data.user_name)
      setName(data.task_msg);
      setDate(moment(data.task_date)._d)
      dateFormatingUsingVanilaJs(data.task_time);

      return setSingleUser(editTask);
    }
    dispatch(get_task());
    if (taskb !== undefined) {
      return setArray(taskb.results);
    }
    // setTimeArray(Time)
    Setdata(Dropdata)
  }, [dispatch, editTask, singleUser, taskb]);

  const dateFormatingUsingVanilaJs = (dataa) => {
    const dateToShow =  dataa && dataa.toString().length === 3 ?
    [dataa.toString().slice(0,1),":",dataa.toString().slice(1)].join('') :
    [dataa.toString().slice(0,2),":",dataa.toString().slice(2)].join('')
    console.log('ffffffffffff',dataa)
    const updatedTime = dataa > 100 && dataa < 700 ? dateToShow + ' pm' : dateToShow + ' am';
    setTime(updatedTime);
  }

  const handleSumit = async (e) => {
    e.preventDefault();
    dispatch(
      add_new_task({
        payload: {
          assigned_user: sessionStorage.getItem("assigned_user") ? sessionStorage.getItem("assigned_user") : sessionStorage.getItem("userId"),
          task_date: moment(date).format('YYYY-MM-DD'),
          task_time: parseInt(time.replace(/[^0-9]/g, '')),
          is_completed: 0,
          time_zone: -330,
          task_msg: name,
        },
      })
    );
    dispatch(get_task());
    setToggle(false);
    setEditFlag(false);
  };

  const toggleForm = () => {
    setToggle(!toggle);
    setEditFlag(false);
    setName("");
    setDate("");
    setTime("");
    setAssignUsr("");
  };
  const handleEditTask = (id) => {
    dispatch(get_single_task({ payload: id }));
    setToggle(true);
    setEditFlag(true);
  };

  const handleDelete = (data) => {
    dispatch(delete_task({payload:data.data.results.id}))
    setToggle(false)
  }

  const handleEditSubmit = (data) => {
    dispatch(
      edit_task({
        taskId: data.data.results.id,
        payload: {
          assigned_user: sessionStorage.getItem("assigned_user") ? sessionStorage.getItem("assigned_user") : sessionStorage.getItem("userId") ,
          task_date: moment(date).format('YYYY-MM-DD'),
          task_time: parseInt(time.replace(/[^0-9]/g, '')),
          is_completed: 0,
          time_zone: -330,
          task_msg: name,
        },
      })
    );
    setToggle(false);
  }
  const handleFormToggle = () => {
    setToggle(false)
  }

  return (
    <div>
      <div className="sidebarBlue"></div>
      <div className="top-parent">
        <div className="inner-parent">
          <div className="header">
          <div><span className="headerspan">TASKS  <span className="count">{taskCount}</span></span></div>
          <div className="buttonToggleParent"><button className="buttonToggle" type="button" onClick={toggleForm}>
            <FaPlus color="#6C6C6D" fontSize="1.2em"/>
            </button>
            <span className="tooltiptext">New Task</span>
            </div>
          </div>
        </div>
        <div>
          {toggle ? (
            <div className="form-parent">
              <form className="add-form" onSubmit={handleSumit}>
                <div className="tasksHeader">
                  <label className="task-desc-header">Task Description</label>
                  <div className="task-input">
                  <input
                    className="task-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Task Description"
                    required
                  />
                <div className="tiDocClass"><span className="TiDoc"><TiDocumentText size={20}/></span></div>
                </div>
                </div>
                <div className="dateandtime">
                  <div className="dateandtimrInner">
                    <label className="lableDate">Date</label>
                    <div className="dateParent">
                    <span className="calender"><FiCalendar size={17}/></span>
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      onChange={(e) => {
                        setDate(e);
                      }}
                      selected={date}
                      className="inputdate"
                      placeholderText="Date"
                      required
                    />
                    </div>
                  </div>
                  <div>
                  <label><span className="timetext">Time</span>
                  </label>
                  <div className="timeDiv">
                  <span className="clockClass"><FiClock size={17}/></span>
                    <input list="time" onChange={(e) => {
                      console.log('eeee',e)
                      // setTime(e.target.value);
                    }}
                    value={time}
                    onFocus={(e) => {
                      var parentTimediv = document.getElementsByClassName('dropdownParent')[0];
                      parentTimediv.style.display="block";
                    }}
                    className="timeInput"
                    name="timeSelect"
                    placeholder="Time"
                    autoComplete="off"
                    required
                    />
                    </div>
                    <div>
                      <div className="dropdownParent" ref={wrapperRef}>
                        {arrayTime.map((data) => {
                          return <div className="dropdownSingleItem" onClick={(e) => {
                            setTime(e.target.textContent);
                            var parentTimediv = document.getElementsByClassName('dropdownParent')[0];
                            parentTimediv.style.display="none";
                          }}>{data}</div>
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tasksHeader">
                  <label className="task-desc-header">Assign user</label>
                  <div className="task-input">

                  <select id="browsers"  onChange={(e) => {
                    sessionStorage.setItem("assigned_user",e.target.value)
                  }}>
                    {
                     Dropdata.dropdown && Dropdata.dropdown.length > 0 ? Dropdata.dropdown.map((data) => {
                       return <option value={data.user_id}>{data.name}</option>
                    }):''}
                </select>
                <div className="tiDocClass tiDocClassTwo"><span><TiArrowUnsorted size={18}/></span></div>
                </div>
                </div>
                <div className="actionButtons">
                {editFlag ? <button className="deleteButton" type="button" onClick={() => handleDelete(singleUser)}><FaTrashAlt/></button>:""}
                <button className="cancelButtons" type="button" onClick={() => handleFormToggle()}>Cancel</button>
                {!editFlag ? <button
                  type="submit"
                  className="saveButton"
                >Save</button> :
                <button className="editSubmit" type="button" onClick={() => handleEditSubmit(singleUser)}>Save Edit</button>}
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
        {toMap && toMap.length ? toMap.map((data) => {
            return (
              <div className="tasks" key={data.id}>
                <div className="task-span"><span className="task-desc">
                  <span><img alt="usr" src={imagName.default} width="35px"/> </span>
                  <div className="task-text-alone">
                    {data.task_msg}
                    <div className="task-date-alone">{data.task_date}</div>
                  </div>
                  </span>
                </div>
                <div className="task-buttons">
                  <button className="editBUtton notification" type="button" onClick={() => handleEditTask(data.id)}>
                  <FaPen/>
                </button>
                <button className="notification" type="button"><FaBell /></button>
                <button className="notification" type="button"><FaCheck/></button>
                </div>
              </div>
            );
          }): ''}
      </div>
    </div>
  );
};
