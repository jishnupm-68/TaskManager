import React from 'react'
import { useNavigate } from 'react-router'

const ListItem = ({todo, status}) => {
    const navigate= useNavigate();
    if(!todo) return
    todo = todo.filter((item)=>item.status==status)
    const getTaskDetails = async(_id)=>{
      navigate('/edit-task/'+_id)
    }
  return (


    <div className="shadow-lg p-3 rounded-xl bg-white">
  <h1 className="text-2xl font-bold mb-4 text-gray-800">{status}</h1>

  {todo.map((item, index) => (
    <div
      key={item._id}
      onClick={() => getTaskDetails(item._id)}
      className={`mb-4 p-4 rounded-lg cursor-pointer transition-all
        ${
          index % 2 === 0
            ? "bg-gray-100 hover:bg-gray-200"
            : "bg-amber-200 hover:bg-amber-300"
        }
        shadow-sm hover:shadow-md active:scale-[0.98]
      `}
    >
      <p className="font-semibold text-lg text-gray-900">
        {item.title}
      </p>

      <p className="text-sm text-gray-600 mt-1">
        Due: {new Date(item.dueDate).toLocaleString()}
      </p>
    </div>
  ))}
</div>

  )
}

export default ListItem
