
import useFetchTodo from './hooks/useFetchTodo'
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import BoardView from './BoardView';
import ListView from './ListView';
import useFilter from './hooks/useFilter';
import useSearch from './hooks/useSearch';
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import useDueDate from './hooks/useDueDate';
import Response from './shared/Response';

const Home = () => {
  
  const statusArr = ["Todo", "In Progress", "Completed"];
  const [resStatus, setResStatus]=useState("");
  const [resMessage, setResMessage] =useState("");
  const [search, setSearch] = useState("")
  const priorityArr = ["Low", "Medium", "High"];
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState('')
  const [view, setView] = useState("board");
  const [dueDateState, setDueDateState] = useState(true);
  useFetchTodo(setResMessage,setResStatus);
  useSearch(search);
  useFilter(filterKey, filterValue)
  useDueDate(dueDateState)
  useEffect(()=>{
    const timer = setTimeout(() => {
      setResMessage("");
      setResStatus("");
    }, 3000);
    return ()=>timer
  },[resStatus,resMessage])
  return (
    <div className="p-6 min-h-screen bg-red-300 ">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6 bg-red-400">
          <h1 className="text-2xl font-semibold pl-3">Tasks</h1>

          <div className="w-5/12 flex flex-col md:flex-row items-center gap-3 md:gap-4 p-4  shadow-md rounded-xl">
            <input
              type="text"
              value = {search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={()=>{ setSearch(""); }}>
              Clear
            </button>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>Status</summary>
                  <ul className="p-2 bg-red-400 w-40 z-1">
                    {statusArr.map((item, index) => (
                      <li key={index}>
                        <a onClick={()=>{setFilterKey('status'); setFilterValue(item);}}>{item}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Priority</summary>
                  <ul className="p-2 bg-red-400 w-40 z-1">
                    {priorityArr.map((item, index) => (
                      <li key={index}>
                        <a  onClick={()=>{
                          setFilterKey('priority');
                          setFilterValue(item);
                        }}>{item}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
              <li>
                <a onClick={()=>setDueDateState(!dueDateState)}>Due Date {dueDateState?<FaArrowDown />:<FaArrowUp/>}</a>
              </li>
            </ul>
          </div>

          {
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-red-400  rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <details>
                    <summary>Status</summary>
                    <ul className="p-2 bg-red-400  w-40 z-1">
                      {statusArr.map((item, index) => (
                        <li key={index}>
                          <a  onClick={()=>{
                          setFilterKey('status');
                          setFilterValue(item);
                        }}>{item}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>Priority</summary>
                    <ul className="p-2 bg-red-400  w-40 z-1">
                      {priorityArr.map((item, index) => (
                        <li key={index}>
                          <a  onClick={()=>{
                          setFilterKey('priority');
                          setFilterValue(item);
                        }}>{item}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
                <li>
                  <a onClick={()=>setDueDateState(!dueDateState)}>Due Date {dueDateState?<FaArrowDown />:<FaArrowUp/>}</a>
                </li>
              </ul>
            </div>
          }

          <div className="flex gap-2 items-center pr-2 ">
            <button
              onClick={() => setView("board")}
              className={`px-3 py-1 rounded-md border ${
                view === "board" ? "bg-gray-400 shadow" : "bg-transparent"
              }`}
            >
              Board
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded-md border ${
                view === "list" ? "bg-gray-400 shadow" : "bg-transparent"
              }`}
            >
              List
            </button>

            <Link to="/add-task" className={`px-3 py-1 rounded-md border`}>
              Add Task
            </Link>
          </div>
         
        </header>
        
         {resStatus && <Response status={resMessage} message={resStatus}/>}
        {view === "board" && <BoardView />}
        {view === "list" && <ListView />}
      </div>
    </div>
  );
}

export default Home
