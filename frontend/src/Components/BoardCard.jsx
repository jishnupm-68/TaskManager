
import { useNavigate } from 'react-router'

const BoardCard = ({status, todo}) => {
    if(!todo) return
    const navigate = useNavigate();
    todo = todo.filter((item)=>item.status===status)
    const getTaskDetails = async(_id)=>{
      navigate('/edit-task/'+_id)
    }
  return (


    <div className="p-3">
  <div className="overflow-x-auto rounded-xl shadow-lg bg-white">

    
    <table className="hidden md:table table-auto w-full text-left border-collapse">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="px-4 py-3 text-lg font-semibold">{status}</th>
          <th className="px-4 py-3 text-lg font-semibold">Action</th>
        </tr>
      </thead>

      <tbody className="text-gray-800">
        {todo &&
          todo.map((item, index) => (
            <tr
              key={item._id}
              onClick={() => getTaskDetails(item._id)}
              className={`cursor-pointer transition 
                ${
                  index % 2 === 0
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-yellow-50 hover:bg-yellow-100"
                }`}
            >
              <td className="px-4 py-3 border-b border-gray-200">
                <p className="font-semibold text-lg text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600">
                  Due: {new Date(item.dueDate).toLocaleString()}
                </p>
              </td>

              <td className="px-4 py-3 border-b border-gray-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    getTaskDetails(item._id);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>

    
    <div className="md:hidden flex flex-col gap-3 p-2">
      {todo &&
        todo.map((item, index) => (
          <div
            key={item._id}
            onClick={() => getTaskDetails(item._id)}
            className={`p-4 rounded-lg shadow cursor-pointer transition 
              ${
                index % 2 === 0
                  ? "bg-gray-50 hover:bg-gray-100"
                  : "bg-yellow-50 hover:bg-yellow-100"
              }`}
          >
            <p className="font-semibold text-base text-gray-900">{item.title}</p>

            <p className="text-sm text-gray-700">
              Due: {new Date(item.dueDate).toLocaleString()}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                getTaskDetails(item._id);
              }}
              className="mt-3 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              View
            </button>
          </div>
        ))}
    </div>
  </div>
</div>


  )
}


export default BoardCard
