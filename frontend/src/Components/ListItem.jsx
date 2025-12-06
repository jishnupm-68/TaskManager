import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router";

const ListItem = ({ todo, status }) => {
  const navigate = useNavigate();
  const items = (todo || []).filter((i) => i.status === status);

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="shadow-lg p-3 rounded-xl bg-white mb-6"
        >
          <h1 className="text-2xl font-bold mb-4 text-gray-800">{status}</h1>

          {items.map((item, index) => (
            <Draggable
              key={String(item._id)}
              draggableId={String(item._id)}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  onClick={() => navigate("/edit-task/" + item._id)}
                  className={`mb-4 p-4 rounded-lg cursor-pointer transition-all ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-amber-200"
                  } shadow-sm hover:shadow-md`}
                >
                  <p className="font-semibold text-lg text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Due: {new Date(item.dueDate).toLocaleString()}
                  </p>
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ListItem;
