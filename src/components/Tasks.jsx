import React, { useState } from "react";
import DatePicker from "react-datepicker";
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

import moment  from "moment";

export const Tasks = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const [toMap, setArray] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [singleUser, setSingleUser] = useState();
  const [editFlag, setEditFlag] = useState(false);
  const [time,setTime] = useState();
  const [taskCount,setArrayLength] = useState();
  const dispatch = useDispatch();

  const taskb = useSelector((state) => state.tasks.task);
  const editTask = useSelector((state) => state.tasks.data)
  const imagName = require('../assets/user1.png');

  useEffect(() => {
    setArrayLength(taskb &&  taskb.results ? taskb.results.length : 0);
    if (editTask !== undefined) {
      const data = editTask.data.results;
      setName(data.task_msg);
      setDate(moment(data.task_date)._d)
      dateFormatingUsingVanilaJs(data.task_time);

      return setSingleUser(editTask);
    }
    dispatch(get_task());
    if (taskb !== undefined) {
      return setArray(taskb.results);
    }
  }, [dispatch, editTask, singleUser, taskb]);

  const dateFormatingUsingVanilaJs = (dataa) => {
    const dateToShow =  dataa && dataa.toString().length === 3 ?
    [dataa.toString().slice(0,1),":",dataa.toString().slice(1)].join('') :
    [dataa.toString().slice(0,2),":",dataa.toString().slice(2)].join('')
    const updatedTime = dataa < 1159 ? dateToShow + ' am' : dateToShow + ' pm';
    setTime(updatedTime);
  }

  const handleSumit = async (e) => {
    e.preventDefault();
    dispatch(
      add_new_task({
        payload: {
          assigned_user: sessionStorage.getItem("userId"),
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
          assigned_user: sessionStorage.getItem("userId"),
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
      <div className="top-parent">
        <div className="inner-parent">
          <div className="header">
          <div><span className="headerspan"><b>TASKS</b> <span className="count">{taskCount}</span></span></div>
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
                  <div>
                  <input
                    className="task-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                <span><TiDocumentText/></span>
                </div>
                </div>
                <div className="dateandtime">
                  <div>
                    <label className="lableDate">Date</label>
                    <div className="dateParent">
                    <span className="calender"><FiCalendar size={13}/></span>
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      onChange={(e) => {
                        setDate(e);
                      }}
                      selected={date}
                      className="inputdate"
                      required
                    />
                    </div>
                  </div>
                  <div>
                  <label><span className="timetext">Time</span>
                  </label>
                  <div className="timeDiv">
                  <span className="clockClass"><FiClock size={13}/></span>
                    <input list="time" onChange={(e) => {
                      setTime(e.target.value);
                    }}
                    className="timeInput"
                    name="timeSelect"
                    value={time}
                    required />
                    </div>
                    <datalist id="time">
                      <option value="8 am"></option>
                      <option value="8:30 am"></option>
                      <option value="9 am"></option>
                      <option value="9:30 am"></option>
                      <option value="10 am"></option>
                      <option value="10:30 am"></option>
                      <option value="11 am"></option>
                      <option value="11:30 am"></option>
                      <option value="12 pm"></option>
                      <option value="12:30 pm"></option>
                      <option value="1 pm"></option>
                      <option value="1:30 pm"></option>
                    </datalist>
                  </div>
                </div>
                <div className="tasksHeader">
                  <label className="task-desc-header">Assign user</label>
                  <div>
                  <input
                    className="task-name"
                    type="text"
                    value={'Prem Kumar'}
                    onChange={(e) => {
                      // setName(e.target.value);`
                    }}
                    readOnly
                    required
                  />
                <span><TiArrowUnsorted/></span>
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
