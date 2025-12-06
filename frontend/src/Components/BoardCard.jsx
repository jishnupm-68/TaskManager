import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router";

const BoardCard = ({ status, todo }) => {
  const navigate = useNavigate();

  const list = todo.filter((item) => item.status === status);

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div className=" w-full ">
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="overflow-x-auto rounded-xl shadow-lg bg-white min-h-[300px] w-full"
          >
            <h2 className="bg-blue-600 text-white px-4 py-3 text-lg font-semibold">
              {status}
            </h2>

            {list.map((item, index) => (
              <Draggable key={item._id} draggableId={item._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => navigate("/edit-task/" + item._id)}
                    className="p-4 border-b border-gray-200 cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <p className="font-semibold text-lg text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      Due: {new Date(item.dueDate).toLocaleString()}
                    </p>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default BoardCard;
