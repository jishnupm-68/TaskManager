import { useSelector } from "react-redux";
import BoardCard from "./BoardCard";


const BoardView = () => {
    const todo = useSelector(state=>state.todo)

  return (
    <div className="bg-gray-400 flex ">
        <div className="flex-3">
            <BoardCard status="Todo" todo={todo}/>
        </div>
        <div className="flex-3">
            <BoardCard status="In Progress"  todo={todo}/>
        </div>
        <div className="flex-3">
            <BoardCard status="Completed"  todo={todo}/>
        </div>
    </div>
  );
};

export default BoardView
