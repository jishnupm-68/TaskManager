import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: null,
    reducers:{
        setTodos: (state, action)=>{
            return action.payload;
        },

        updateTodoStatus(state, action) {
      const { id, status } = action.payload;
      const task = state.find((t) => t._id === id);
      if (task) task.status = status;
    },
    }
})

export const { setTodos ,updateTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;