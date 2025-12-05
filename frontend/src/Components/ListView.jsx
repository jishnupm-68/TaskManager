import React from 'react'
import { useSelector } from 'react-redux';
import ListItem from './ListItem';

const ListView = () => {
  let todo = useSelector((state)=>state.todo)
  if(!todo) return
  return (
    <div className="bg-white text-blue-600 shadow-lg rounded-xl p-6 border border-gray-200 max-w-3xl mx-auto">
          
            <ListItem todo={todo} status={"Todo"} />
            <ListItem todo={todo} status={"In Progress"} />
            <ListItem todo={todo} status={"Completed"} />
          
        </div>
  ); 
};

export default ListView
