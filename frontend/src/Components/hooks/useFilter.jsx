import { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { setTodos } from "../../utils/store/slice/todoSlice";

const useFilter = (filterKey, filterValue) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleFilter = async () => {
      try {
        const res = await fetch(BASE_URL + "filter", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filterKey, filterValue }),
        });
        const resJson = await res.json();
        if (resJson.status) {
          dispatch(setTodos(resJson.data));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    handleFilter();
  }, [filterKey, filterValue, dispatch]);
};

export default useFilter;
