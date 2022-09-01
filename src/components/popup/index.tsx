import React from "react"
import { useState } from "react"
import Input from "../input"
import { Ipopup } from "./model"

const PopUp: React.FC<Ipopup> = ({ close, data, edidValue }) => {

    const [value, setValue] = useState<string>(data.value)

    let validValue: boolean = false

    const handleClose = () => {
        close(false)
    }

    const handleChange = (event: React.SyntheticEvent<EventTarget>): void => {
        const { value } = event.target as HTMLInputElement
        setValue(value)
    }

    const handleEdit = () => {
        edidValue(value, data.id)
    }

    const handleValidValue = (value: boolean) => {
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
                        change={(e: React.SyntheticEvent<EventTarget>) => handleChange(e)}
                        isValid={(value: boolean) => handleValidValue(value)}

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