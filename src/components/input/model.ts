export interface Iinput {
    change: React.FormEventHandler<HTMLInputElement>,
    value: string | any,
    placeHolder: string,
    isValid: Function,

}