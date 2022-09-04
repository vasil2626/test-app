import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Itodo } from "../components/todo/model";
import { ItodoState } from "./models/todoModel"


const initialState: ItodoState = {
    list: []
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<Itodo>) {
            const { payload } = action

            state.list.push(payload)
        },

        ediidTodo(state, action: PayloadAction<Itodo>) {
            const { payload } = action

            const initialState = [...state.list]

            const edit = initialState.filter((item): boolean => {
                return item.id === payload.id
            })

            edit[0].value = payload.value

        },

        deleteTodo(state, action: PayloadAction<object[]>) {

            const { payload } = action

            console.log(typeof payload);


            state.list = payload

        },

        restoreTodo(state, action: PayloadAction<Itodo>) {
            state.list.push(action.payload)
        },

        checkTodo(state, action: PayloadAction<object[]>) {

            const { payload } = action

            state.list = payload


        }
    }
})

export const { addTodo, ediidTodo, deleteTodo, restoreTodo, checkTodo } = todoSlice.actions

export default todoSlice.reducer