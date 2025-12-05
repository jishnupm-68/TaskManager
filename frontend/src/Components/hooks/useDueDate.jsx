import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../../utils/constants';
import { setTodos } from '../../utils/store/slice/todoSlice';

const useDueDate = (dueDateState) => {
  const dispatch = useDispatch();
  const handleDueDate = async()=>{
    try {
        const filterKey = "dueDate";
        const filterValue =dueDateState;
        const res = await fetch(BASE_URL+"filter",{
            credentials:'include',
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({filterKey, filterValue})
        })
        const resJson = await res.json();
        if (resJson.status) dispatch(setTodos(resJson.data));
    } catch (error) {
        console.log(error.message)
    }
  }
  useEffect(()=>{
    handleDueDate();
  },[dueDateState])
}

export default useDueDate
