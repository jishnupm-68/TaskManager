
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
      <button onClick={()=>getTaskDetails(item._id)}>
      <tr key={item.id}>
          <td className={(index%2==0?'bg-red-800 ':'bg-green-500')+ ' border-red-900 cursor-pointer'}>{item.title}
            <br />
            Due: {new Date(item.dueDate).toLocaleString()}
        </td>
      </tr>
      </button>
    ))
  }
</tbody>
    </table>

      
    </div>
  )
}

export default BoardCard
