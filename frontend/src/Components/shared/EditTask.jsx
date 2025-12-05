import React from 'react'
import InputField from './InputField'
import { useState } from 'react'
import DropDown from './DropDown';
import Response from './Response';
import { useEffect } from 'react';
import { BASE_URL } from '../../utils/constants';
import { Link, Navigate, useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import AlertModal from './AlertModal';
import TextArea from './TextArea';

const EditTask = () => {
    const {_id} = useParams();
    let todo =  useSelector(state=>state.todo);
    
    todo = todo ? todo.filter((item)=>item._id===_id):null;
    
  
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle]= useState(todo[0]?.title);
  const [priority, setPriority]= useState(todo[0]?.priority);
  const priorityList = ["Low", "Medium", "High"];
  const statusList =["Todo", "In Progress", "Completed"];
  const [status, setStatus] = useState(todo[0]?.status);
  const formattedDate = todo[0]?.dueDate
  ? new Date(todo[0].dueDate).toISOString().slice(0,16)
  : "";
  const [dueDate, setDueDate] = useState(formattedDate);
  const navigate = useNavigate()
  const handleUpdateTask = async()=>{
    
    const editTask = async()=>{
      try {
        console.log(BASE_URL+"todo")
        const res = await fetch(BASE_URL+'todo', {
              method: 'PATCH',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({_id, title, priority, status, dueDate }), }
            );
      const result = await res.json();
      console.log("result of updating", result)
      setStatusRes(result?.status);
      setMessage(result?.message);
        
      } catch (error) {
        console.log(error.message)
      }
    }
    editTask()
  } 
  const [statusRes, setStatusRes] = useState(false);
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
      <h2 className="card-title">Edit Task</h2>
      
       <TextArea value={title} setValue={setTitle} label={"Title"} />
      <DropDown options={"Priority"} list={priorityList} listVal={priority} setValue={setPriority}/>
      <DropDown options={"Status"} list={statusList} listVal={status} setValue={setStatus}/>
      <InputField value={dueDate} setValue={setDueDate} label={"Due Date" } type="datetime-local" />
      <div className="card-actions justify-end">
        <button
  className="btn bg-red-600 text-white px-4 py-2 rounded"
  onClick={() => setShowModal(true)}
>
  Delete
</button>
<AlertModal _id={todo[0]._id} setShowModal={setShowModal} showModal={showModal} />
        <Link className="btn btn-warning" to={'/'}>Cancel</Link>
        <button className={"btn btn-primary"} onClick={()=>handleUpdateTask()}>Update Task</button>
      </div>
      {message && <Response message={message} status={statusRes}/>}
    </div>
  </div>
</div>

  )
}

export default EditTask
