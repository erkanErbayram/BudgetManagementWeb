const initialState = {
    expense: [],
    loading: true
}

export default function expenseReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_EXPENSE":
            return { ...state, expense: action.payload, loading: false }
        case "SET_EXPENSE":
            return { ...state, ...action.payload, loading: false }
        case "DELETE_EXPENSE":
            return { ...state, ...action.payload, loading: false }
        default:
            return state
    }
}