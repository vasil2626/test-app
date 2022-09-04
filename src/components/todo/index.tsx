import React, { useEffect, useState } from "react";
import Input from "../input";
import PopUp from "../popup";
import Restore from "../restore/index"
import TodoList from "../todoList";
import { Itodo, Irestore } from "./model";
import {
    addTodo,
    ediidTodo,
    deleteTodo,
    restoreTodo,
    checkTodo
} from "../../redux/todoSlicce";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const Todo: React.FC = () => {

    const [inputValue, setInputValues] = useState<string>("")
    const [popUp, setPopUp] = useState<boolean>(false)
    const [itemDate, setitemDate] = useState<{}>()
    const [restoreDate, setRestoreDate] = useState<Irestore[] | any>([])
    const [restorePopUp, setRestore] = useState<boolean>(false)
    const [showRestor, setShowRestor] = useState<boolean>(false)
    const [validValue, setValidValue] = useState<boolean>(true)

    const dispatch = useAppDispatch()

    const todos = useAppSelector(state => state.todos)

    const normalDate = (date: object): string => {
        return date.toLocaleString()
    }

    const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
        const { value } = event.target as HTMLInputElement
        setInputValues(value)

    }

    const handleClick = () => {

        if (!!inputValue && validValue) {

            dispatch(addTodo({
                id: new Date().getMilliseconds(),
                date: normalDate(new Date()),
                value: inputValue,
                checked: false,
            }))
        }

        setInputValues("")

    }

    const openPopUp = (value: string, id: number): void => {

        const popUpData = { value, id }
        setPopUp(true)
        setitemDate(popUpData)

    }

    const handleClose = (value: boolean): void => {
        setPopUp(value)
    }

    const handleEdit = (value: string, id: number): void => {

        const params = { value, id }

        dispatch(ediidTodo(params))

        setPopUp(false)
    }

    const handleDelete = (id: number) => {

        const delTodo = todos.list.find((item): boolean => item.id === id)

        const newTodo = todos.list.filter((item) => {
            return item.id !== id
        })

        dispatch(deleteTodo(newTodo))

        setRestoreDate([...restoreDate, delTodo])

        setShowRestor(true)
    }

    const handleRestored = (data: object): void => {


        dispatch(restoreTodo(data))

        setRestore(false)

    }

    const deleteRestore = (el: object | any) => {

        const deletRestoreDate = restoreDate.filter((item: object | any) => {

            return item.id !== el.id

        })

        setRestoreDate([...deletRestoreDate])

        if (!deletRestoreDate.length) {

            setRestore(false)
            setShowRestor(false)

        }
    }

    const handleChack = (id: number) => {

        const newTodo = todos.list.map((item: any): object => item.id === id ?
            { ...item, checked: !item.checked } : { ...item })

        dispatch(checkTodo(newTodo))
    }

    const handleValidValue = (value: boolean) => {
        setValidValue(value)
    }

    useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {

            event.key === "Enter" && handleClick()
        };

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    })

    return (

        <div className="Todo">
            <div className="input_wrapper">
                <Input
                    change={handleChange}
                    value={inputValue}
                    placeHolder="Add task"
                    isValid={(value: boolean) => handleValidValue(value)}
                />
                <button
                    className="Add_button"
                    onClick={handleClick}
                >
                    Add
                </button>
                {
                    showRestor &&
                    <button className="restore_button" onClick={(): void => {
                        setRestore(true)
                    }}>restore</button>

                }

            </div>
            {
                !!todos.list.length &&
                <div className="todo_wrapper">
                    {
                        todos.list?.map(({ id, value, date, checked }: any): JSX.Element => (
                            <div className="todo_item" key={id}>
                                <TodoList
                                    value={value}
                                    date={date}
                                    checked={checked}
                                    id={id}
                                    deletItem={(id: number) => handleDelete(id)}
                                    checkItem={(id: number) => handleChack(id)}
                                    isOPen={(value: string, id: number) => openPopUp(value, id)} />
                            </div>
                        ))
                    }
                </div>
            }

            {
                popUp &&
                <PopUp
                    close={(value: boolean) => handleClose(value)}
                    data={itemDate}
                    edidValue={(value: string, id: number): void => handleEdit(value, id)}

                />
            }
            {
                restorePopUp &&
                <Restore
                    datas={restoreDate}
                    close={(value: boolean) => setRestore(value)}
                    isRestored={(data: object) => handleRestored(data)}
                    deleteRestore={(el: object) => deleteRestore(el)}
                />
            }

        </div>
    );
}

export default Todo