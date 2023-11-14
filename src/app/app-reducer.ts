export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState

//actions type
export type setStatusType = ReturnType<typeof setStatusAC>
export type setErrorType = ReturnType<typeof setErrorAC>

const initialState = {
    error: null as null | string,
    status: 'loading' as RequestStatusType
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR' :
            return {...state,error: action.error}
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

type ActionsType = setStatusType | setErrorType
