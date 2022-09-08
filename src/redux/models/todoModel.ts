interface Itodo {
    id?: number,
    date?: string,
    value?: string,
    checked?: boolean
}

export interface ItodoState {
    list: Itodo[],
    loading: boolean,
    error: string
}