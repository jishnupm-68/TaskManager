import React from 'react'
import { useDispatch } from 'react-redux';
import { setTodos } from '../../utils/store/slice/todoSlice';
import { useEffect } from 'react';
import { BASE_URL } from '../../utils/constants';


const useFetchTodo = () => {
    const dispatch = useDispatch();
    const fetchTodos = async()=>{
        try {
        const res = await fetch(BASE_URL, {
            method: 'GET',
            credentials: 'include',
            headers: {}});
        const result = await res.json();
        dispatch(setTodos(result?.data));
        } catch (error) {
            console.log(error.message)
        }
    }

    
    useEffect(()=>{
        fetchTodos()
    },[])
  return (
    <div>
      
    </div>
  )
}

export default useFetchTodo
