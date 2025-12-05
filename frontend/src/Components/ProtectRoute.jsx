
import React from 'react'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { setTodos } from '../utils/store/slice/todoSlice';
import { BASE_URL } from '../utils/constants';

const ProtectRoute = () => {
    const dispatch = useDispatch();
    const token = document.cookie;
    console.log("token: ", token)
    const fetchUser = async()=>{
        try {
            const res = await fetch(BASE_URL, {
            method: 'GET',
            credentials: 'include',
            headers: {}});
        const result = await res.json();
        dispatch(setTodos(result?.data));
            
        } catch (error) {
            console.log("error while fetching user data", error);
        }
    }
    useEffect(()=>{
        fetchUser()
    },[])
   return token.length<4 ? <Navigate to="/login" replace /> : <Outlet />;
  
}

export default ProtectRoute
