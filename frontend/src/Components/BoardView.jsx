import { useSelector } from "react-redux";
import BoardCard from "./BoardCard";

const BoardView = () => {
  const todo = useSelector((state) => state.todo);

  return (
    <div className="bg-red-300 flex px-4 py-4 ">
      <div className="flex-3 ">
        <BoardCard status="Todo" todo={todo} />
      </div>
      <div className="flex-3">
        <BoardCard status="In Progress" todo={todo} />
      </div>
      <div className="flex-3 ">
        <BoardCard status="Completed" todo={todo} />
      </div>
    </div>
  );
};

export default BoardView;
