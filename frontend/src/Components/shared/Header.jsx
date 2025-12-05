import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import useFetchTodo from '../hooks/useFetchTodo';

const Header = () => {
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
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <Link className="btn btn-ghost text-xl" to={'/'}>Todo</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2 bg-base-100 w-40 z-1">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    {todo ==null ? <Link className="btn" to={"/login"}>{"Login"}</Link>:
    <button className="btn" onClick={handleLogout}>Logout</button>}
  </div>
</div>
  )
}

export default Header
