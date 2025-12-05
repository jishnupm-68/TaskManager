import React from 'react'
import useFetchTodo from './hooks/useFetchTodo'
import { useState } from 'react';
import { Link } from 'react-router';
import BoardView from './BoardView';
import ListView from './ListView';


const Home = () => {
  useFetchTodo();
  const [view, setView] = useState("board");
  return (
    <div className="p-6 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <div className="flex gap-2 items-center bg-red-400">
            <button
              onClick={() => setView("board")}
              className={`px-3 py-1 rounded-md border ${
                view === "board" ? "bg-white shadow" : "bg-transparent"
              }`}
            >
              Board
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded-md border ${
                view === "list" ? "bg-white shadow" : "bg-transparent"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView("pictorial")}
              className={`px-3 py-1 rounded-md border ${
                view === "pictorial" ? "bg-white shadow" : "bg-transparent"
              }`}
            >
              Pictorial
            </button>
             < Link
              to="/add-task"
              className={`px-3 py-1 rounded-md border`}
            >
              Add Task
            </Link>

          </div>
        </header>
        {view === "board" && <BoardView />}
        {view === "list" && <ListView />}
      </div>
    </div>
  );
}

export default Home
