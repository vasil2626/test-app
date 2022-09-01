import React, { useEffect, useState } from "react";
import Input from "../input";
import PopUp from "../popup";
import Restore from "../restore/index"
import TodoList from "../todoList";
import { Itodo } from "./model";

const Todo: React.FC = () => {

    const [inputValue, setInputValues] = useState<Itodo | string>()
    const [todoList, setTodoList] = useState<Itodo | any>([])
    const [popUp, setPopUp] = useState<Itodo | boolean>(false)
    const [itemDate, setitemDate] = useState<Itodo | any>()
    const [restoreDate, setRestoreDate] = useState<Itodo | any>([])
    const [restorePopUp, setRestore] = useState<Itodo | boolean>(false)
    const [showRestor, setShowRestor] = useState<Itodo | boolean>(false)
    const [validValue, setValidValue] = useState<Itodo | boolean>(true)

    const normalDate = (date: object): string => {
        return date.toLocaleString()
    }

    const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
        const { value } = event.target as HTMLInputElement
        setInputValues(value)

    }

    const handleClick = () => {

        if (!!inputValue && validValue) {
            setTodoList([...todoList, {
                id: new Date().getMilliseconds(),
                date: normalDate(new Date()),
                value: inputValue,
                checked: false,
            }])
        }

        setInputValues("")

    }

    const openPopUp = (value: string, id: number): void => {

        const popUpData = { value, id }
        setPopUp(true)
        setitemDate(popUpData)

    }

    const handleClose = (value: any): void => {
        setPopUp(value)
    }

    const handleedit = (value: string, id: number): void => {

        const initialState = [...todoList]

        const edit = initialState.filter((item): boolean => {
            return item.id === id
        })

        edit[0].value = value

        setPopUp(false)
    }

    const handleDelete = (id: number) => {

        const delTodo = todoList.find((item: any) => item.id === id)
        setRestoreDate([...restoreDate, delTodo])
        const filteritem = todoList.filter((item: any): boolean => item.id !== id)

        setTodoList(filteritem)
        setShowRestor(true)
    }

    const handleRestored = (data: object): void => {

        setTodoList([...todoList, { ...data }])
        setRestore(false)

    }

    const deleteRestore = (el: object | any) => {

        const deletRestoreDate = restoreDate.filter((item: any): any => {
            return item.id !== el.id

        })

        setRestoreDate([...deletRestoreDate])

        if (!deletRestoreDate.length) {

            setRestore(false)
            setShowRestor(false)

        }
    }

    const handleChack = (id: number): void => {
        const newTodo = todoList.map((item: any): object => item.id === id ?
            { ...item, checked: !item.checked } : { ...item })
        setTodoList(newTodo)
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
                !!todoList.length &&
                <div className="todo_wrapper">
                    {
                        todoList?.map(({ id, value, date, checked }: any) => {
                            return (
                                <div className="todo_item" key={id} >
                                    <TodoList
                                        value={value}
                                        date={date}
                                        checked={checked}
                                        id={id}
                                        deletItem={(id: number) => handleDelete(id)}
                                        checkItem={(id: number) => handleChack(id)}
                                        isOPen={(value: string, id: number) => openPopUp(value, id)}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            }

            {
                popUp &&
                <PopUp
                    close={(value: string): void => handleClose(value)}
                    data={itemDate}
                    edidValue={(value: string, id: number): void => handleedit(value, id)}

                />
            }
            {
                restorePopUp &&
                <Restore
                    datas={restoreDate}
                    close={(value: boolean): void => setRestore(value)}
                    isRestored={(data: object): void => handleRestored(data)}
                    deleteRestore={(el: object): void => deleteRestore(el)}
                />
            }

        </div>
    );
}

export default Todo