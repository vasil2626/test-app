import { useEffect } from "react"

const Input = ({ change, value, placeHolder, isValid }) => {


    const checkValidation = () => {

        const regexp = /^[^\s]+(\s+[^\s]+)*$/
        return regexp.test(value)
    }

    useEffect(() => {
        isValid(checkValidation())
    })

    return (
        <div className="input_field">
            <input
                type="text"
                className="input"
                onChange={(event) => change(event)}
                value={value}
                placeholder={placeHolder}
                style={!checkValidation() && value ? { borderColor: "red" } : { borderColor: "" }}
            />
        </div>
    );
}

export default Input;