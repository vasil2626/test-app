import { useState } from "react"
import Input from "../input"

const PopUp = ({ close, data, edidValue }) => {

    const [value, setValue] = useState(data.value)

    let validValue = false

    const handleClose = () => {
        close(false)
    }

    const handleChange = (event) => {
        const { value } = event.target
        setValue(value)
    }

    const handleEdit = () => {
        edidValue(value, data.id)
    }

    const handleValidValue = (value) => {
        validValue = value
    }

    return (
        <div className="popup">
            <div className="popup-window">
                <div className="popup_head">
                    <span className="poup_title">Edit</span>
                    <span className="poup_close" onClick={handleClose}>X</span>
                </div>
                <div className="popup-content">
                    <span className="popup_date">
                        {data.date}
                    </span>
                    <Input
                        value={value}
                        placeHolder="Edit task"
                        change={(e) => handleChange(e)}
                        isValid={(value) => handleValidValue(value)}

                    />
                    <div className="button_wrapper">
                        <button className="popup_buttons ok" onClick={handleEdit}>Ok</button>
                        <button className="popup_buttons cancel" onClick={handleClose}>Cancel</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PopUp