import React from 'react'
import { useDispatch } from 'react-redux';
import { setTodos } from '../../utils/store/slice/todoSlice';
import { useEffect } from 'react';
import { BASE_URL } from '../../utils/constants';


const useFetchTodo = (setResStatus, setResMessage) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchTodos = async()=>{
        try {
        const res = await fetch(BASE_URL, {
            method: 'GET',
            credentials: 'include',
            headers: {}});
        const result = await res.json();
        dispatch(setTodos(result?.data));
        setResMessage(result.message);
        setResStatus(result.status)
        } catch (error) {
            console.log(error.message+ error.status)
            setResMessage(error.message);
            setResStatus(error.status)

        }
    }
        fetchTodos()
    },[])
    if(!setResMessage || !setResStatus) return
    
    
  return (
    <div>
      
    </div>
  )
}

export default useFetchTodo
