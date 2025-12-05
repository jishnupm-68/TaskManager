
import { useNavigate } from 'react-router'

const BoardCard = ({status, todo}) => {
    if(!todo) return
    const navigate = useNavigate();
    todo = todo.filter((item)=>item.status===status)
    const getTaskDetails = async(_id)=>{
      navigate('/edit-task/'+_id)
    }
  return (
    <div>
      
      <table class="table-auto  ">
  <thead>
    <tr>
      <th>{status}</th>
    </tr>
  </thead>
  <tbody className='bg-red-100 '>
  
  {todo &&
  todo.map((item, index) => (
    <tr key={item._id} onClick={() => getTaskDetails(item._id)}
        className={index % 2 === 0 ? "bg-red-800" : "bg-green-500"}>
      
      <td className="border-red-900 cursor-pointer">
        {item.title}
        <br />
        Due: {new Date(item.dueDate).toLocaleString()}
        <br />
        
      </td>
      <td>
        <button
          onClick={(e) => {
            e.stopPropagation();      // prevent row click
            getTaskDetails(item._id); // your function
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          View
        </button>
      </td>
    </tr>
  ))
}

</tbody>
    </table>

      
    </div>
  )
}

export default BoardCard
