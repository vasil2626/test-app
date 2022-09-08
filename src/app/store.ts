import { logger } from 'redux-logger';
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/todoSlicce"
import { todoApiReducer } from "../redux/getTodoSlice"

const createMiddleware = [logger]

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        getTodos: todoApiReducer
    },
    // middleware: createMiddleware
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch 