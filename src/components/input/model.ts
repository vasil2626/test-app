export interface Iinput {
    change: Function,
    value: string | any,
    placeHolder: string,
    isValid: Function,
    onChange?: React.FormEventHandler<HTMLInputElement>;

}