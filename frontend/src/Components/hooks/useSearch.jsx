import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { setTodos } from "../../utils/store/slice/todoSlice";

const useSearch = (search) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const res = await fetch(BASE_URL + "search", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search }),
        });

        const resJson = await res.json();

        if (resJson.status) {
          dispatch(setTodos(resJson.data));
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    const timer = setTimeout(() => {
      handleSearch();
    }, 1000); 

    return () => clearTimeout(timer);
  }, [search, dispatch]);
};

export default useSearch;
