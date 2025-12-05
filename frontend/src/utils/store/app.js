import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './slice/todoSlice.js'
import userReducer from './slice/userSlice.js'
const store = configureStore({
    reducer:{
        todo: todoReducer,
        user: userReducer,
    }
})

export default store;