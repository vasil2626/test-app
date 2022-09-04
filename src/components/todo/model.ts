export interface Itodo {

    id?: number,
    date?: string,
    popUp?: boolean,
    value?: string,
    checked?: boolean,
}

export interface Irestore {
    checked?: boolean,
    date?: string,
    id?: number,
    value?: string
}