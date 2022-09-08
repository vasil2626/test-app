import axios from './todoApi';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ItodoState } from "./models/todoModel";

export const fetchTodo = createAsyncThunk("get/todo", async () => {

    const { data } = await axios.get("/todos");

    return data;
})

const initialState: ItodoState = {
    list: [],
    loading: false,
    error: ""
}

const GetTodoSlice = createSlice({
    name: "getTodo",
    initialState,
    reducers: {},
    extraReducers: (build) => {

        build.addCase(fetchTodo.pending, (state, action: PayloadAction<any>) => {
            state.loading = true

        })
        build.addCase(fetchTodo.fulfilled, (state, action: PayloadAction<any>) => {

            state.list = action.payload
            state.loading = false

        })
        build.addCase(fetchTodo.rejected, (state, action: PayloadAction<any>) => {
            state.error = "error"
            state.loading = false

        })
    }

})


export const todoApiReducer = GetTodoSlice.reducer

