import { useEffect, useState } from "react";
import Input from "../input";
import PopUp from "../popup";
import Restore from "../restore/index"
import TodoList from "../todoList";

const Todo = () => {

    const [inputValue, setInputValues] = useState("")
    const [todoList, setTodoList] = useState([])
    const [popUp, setPopUp] = useState(false)
    const [itemDate, setitemDate] = useState()
    const [restoreDate, setRestoreDate] = useState([])
    const [restorePopUp, setRestore] = useState(false)
    const [showRestor, setShowRestor] = useState(false)
    const [validValue, setValidValue] = useState(true)

    const normalDate = (date) => {
        return date.toLocaleString()
    }

    const handleChange = (event) => {
        const { value } = event.target
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

    const openPopUp = (value, id) => {

        const popUpData = { value, id }
        setPopUp(true)
        setitemDate(popUpData)

    }

    const hamdleClose = (value) => {
        setPopUp(value)
    }

    const handleedit = (value, id) => {

        const initialState = [...todoList]

        const edit = initialState.filter((item) => {
            return item.id === id
        })

        edit[0].value = value

        setPopUp(false)
    }

    const handleDelete = (id) => {

        const delTodo = todoList.find((item) => item.id === id)
        setRestoreDate([...restoreDate, delTodo])
        const filteritem = todoList.filter(item => item.id !== id)

        setTodoList(filteritem)
        setShowRestor(true)
    }

    const handleRestored = (data) => {
        setTodoList([...todoList, { ...data }])
        setRestore(false)
    }

    const deleteRestore = (el) => {
        const deletRestoreDate = restoreDate.filter(item => {
            return item.id !== el.id
        })

        setRestoreDate([...deletRestoreDate])

        if (!deletRestoreDate.length) {
            setRestore(false)
            setShowRestor(false)

        }
    }

    const handleChack = (id) => {
        const newTodo = todoList.map(item => item.id === id ? { ...item, checked: !item.checked } : { ...item })
        setTodoList(newTodo)
    }

    const handleKeyDown = (event) => {

        event.key === "Enter" && handleClick()
    }

    const handleValidValue = (value) => {
        setValidValue(value)
    }

    useEffect(() => {

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
                    isValid={(value) => handleValidValue(value)}


                />
                <button
                    className="Add_button"
                    onClick={handleClick}
                >
                    Add
                </button>
                {
                    showRestor &&
                    <button className="restore_button" onClick={() => {
                        setRestore(true)
                    }}>restore</button>

                }

            </div>
            {
                !!todoList.length &&
                <div className="todo_wrapper">
                    {
                        todoList?.map(({ id, value, date, checked }) => {
                            return (
                                <div className="todo_item" key={id} >
                                    <TodoList
                                        value={value}
                                        date={date}
                                        checked={checked}
                                        id={id}
                                        deletItem={(id) => handleDelete(id)}
                                        checkItem={(id) => handleChack(id)}
                                        isOPen={(value, id) => openPopUp(value, id)}
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
                    close={(value) => hamdleClose(value)}
                    data={itemDate}
                    edidValue={(value, id) => handleedit(value, id)}

                />
            }
            {
                restorePopUp &&
                <Restore
                    datas={restoreDate}
                    close={(value) => setRestore(value)}
                    isRestored={(data) => handleRestored(data)}
                    deleteRestore={(el) => deleteRestore(el)}

                />
            }

        </div>
    );
}

export default Todo