const initialState = {
    income: [],
    loading: true
}

export default function incomeReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_INCOME":
            return { ...state, income: action.payload, loading: false }
        case "SET_INCOME":
            return { ...state, ...action.payload, loading: false }
        case "DELETE_INCOME":
            return { ...state, ...action.payload, loading: false }
        default:
            return state
    }
}