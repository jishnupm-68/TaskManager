import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../../utils/store/slice/todoSlice";
import { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";

const useFetchTodo = (setResStatus, setResMessage) => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(BASE_URL, {
          method: "GET",
          credentials: "include",
          headers: {},
        });
        const result = await res.json();
        const { todos } = result.data;
        dispatch(setTodos(todos));
        setResMessage(result.message);
        setResStatus(result.status);
      } catch (error) {
      }
    };

    if (todo) return;
    fetchTodos();
  }, []);
  if (!setResMessage || !setResStatus) return;
};

export default useFetchTodo;
