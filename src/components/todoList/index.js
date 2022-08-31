const TodoList = ({
    value,
    date,
    checked,
    id,
    deletItem,
    checkItem,
    isOPen
}) => {

    return (
        <>
            <span >{date}</span>
            <span style={{ textDecoration: checked ? "line-through" : "none" }}>{value}</span>
            <div className="item_buttons">
                <button onClick={() => isOPen(value, id)}> Edit </button>
                <button onClick={() => deletItem(id)}> delet </button>
                <input type="checkbox" onChange={() => checkItem(id)} checked={checked} />
            </div>
        </>
    )
}

export default TodoList