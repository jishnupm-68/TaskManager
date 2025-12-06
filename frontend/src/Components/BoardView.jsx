import { DragDropContext } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import BoardCard from "./BoardCard";
import { updateTodoStatus } from "../utils/store/slice/todoSlice";
import { BASE_URL } from "../utils/constants";

const BoardView = () => {
  const todo = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const statuses = ["Todo", "In Progress", "Completed"];
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const fromStatus = source.droppableId;
    const toStatus = destination.droppableId;
    if (fromStatus === toStatus) return;
    const res = await fetch(BASE_URL + "todo", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: draggableId,
        status: toStatus,
      }),
    });
    const data = await res.json();

    if (data.status) {
      // update redux
      dispatch(updateTodoStatus({ id: draggableId, status: toStatus }));
    }
  };
  if (!todo) return;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-red-300 flex px-4 py-4 gap-4">
        {statuses.map((s) => (
          <div className="flex-1" key={s}>
            <BoardCard status={s} todo={todo} />
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardView;
