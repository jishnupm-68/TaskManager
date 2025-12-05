import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import useFetchTodo from '../hooks/useFetchTodo';

const Header = () => {
  const statusArr= ["Todo", "In Progress", "Completed"]
  const priorityArr = ["Low", "Medium", "High"]
  useFetchTodo();
  const navigate = useNavigate();
  const handleLogout = async()=>{
    try {
      const res = await fetch('http://localhost:3000/logout', {
        method: 'POST'});
        const result = await res.json();
        console.log("Logout response:", result);
      if(res.status) navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  }
  
  const todo = useSelector((state)=> state.todo);
  return (
    <div className="navbar bg-base-100 shadow-sm text-gray-600">
  <div className="navbar-start">
    <Link className="btn btn-ghost text-xl" to={'/'}>Todo</Link>
  </div>
  <div className="navbar-end">
    {todo ==null ? <Link className="btn" to={"/login"}>{"Login"}</Link>:
    <button className="btn" onClick={handleLogout}>Logout</button>}
  </div>
</div>
  )
}

export default Header
