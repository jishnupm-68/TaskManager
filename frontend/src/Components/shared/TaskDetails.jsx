import React from 'react'
import InputField from './InputField'
import { useState } from 'react'
import DropDown from './DropDown';
import Response from './Response';
import { useEffect } from 'react';
import { BASE_URL } from '../../utils/constants';
import { Link, Navigate, useNavigate } from 'react-router';
import Dictaphone from '../Dictaphone';
import TextArea from './TextArea';

const TaskDetails = () => {
  const [title, setTitle]= useState("");
  const [priority, setPriority]= useState("");
  const priorityList = ["Low", "Medium", "High"];
  const statusList =["Todo", "In Progress", "Completed"];
  const [status, setStatus] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [transcript, setTranscript] = useState("");
  const navigate = useNavigate()
  
  const handleAddTask = async()=>{
    if(!title || !priority || !dueDate){
      setMessage("Please fill the required fileds")
      setStatusRes(false)
    }
    const addTask = async()=>{
      const res = await fetch(BASE_URL+'todo', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title, priority, status, dueDate }), }
            );
      const result = await res.json();
      setStatusRes(result?.status);
      setMessage(result?.message);
    }
    addTask()
  }
  const [statusRes, setStatusRes] = useState("");
  const [message, setMessage] = useState("")
  useEffect(()=>{
    const timer = setTimeout(() => {      
      setMessage("");
      if(statusRes) navigate('/')
      setStatusRes(false);
    }, 3000);
    return()=> timer
  },[message]);
  return (
    
    <div className='flex justify-center items-center min-h-screen'>
  <div className="card w-96 bg-gray-500 shadow-sm text-amber-950">
    <div className="card-body">
      <h2 className="card-title">Add task</h2>
      <TextArea value={title} setValue={setTitle} label={"Title"} />
      <DropDown options={"Priority"} list={priorityList} listVal={priority} setValue={setPriority}/>
      <DropDown options={"Status"} list={statusList} listVal={status} setValue={setStatus}/>
      <InputField value={dueDate} setValue={setDueDate} label={"Due Date" } type="datetime-local" />
      <div className="card-actions justify-end">
        <Dictaphone setTranscript={setTranscript}
        setTitle={setTitle}
        setDueDate={setDueDate}
        setPriority={setPriority}
        setStatus = {setStatus}/>
        <Link className="btn btn-warning" to={'/'}>Cancel</Link>
        <button className="btn btn-primary" onClick={()=>handleAddTask()}>Add Task</button>
      </div>
      {message && <Response message={message} status={statusRes}/>}
      {transcript && <p>Message: {transcript}</p>}
    </div>
  </div>
</div>

  )
}

export default TaskDetails
