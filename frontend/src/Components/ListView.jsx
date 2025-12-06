import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "./ListItem";
import { updateTodoStatus } from "../utils/store/slice/todoSlice";
import { BASE_URL } from "../utils/constants";

const ListView = () => {
  const todo = useSelector((state) => state.todo || []);
  const dispatch = useDispatch();
  const statuses = ["Todo", "In Progress", "Completed"];

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;
    const newStatus = destination.droppableId;
    const id = String(draggableId);
    try {
      const res = await fetch(BASE_URL + "todo", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, status: newStatus }),
      });
      const data = await res.json();
      if (data.status) dispatch(updateTodoStatus({ id, status: newStatus }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-white text-blue-600 shadow-lg rounded-xl p-6 border border-gray-200 max-w-3xl mx-auto">
        {statuses.map((s) => (
          <ListItem key={s} todo={todo} status={s} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default ListView;
