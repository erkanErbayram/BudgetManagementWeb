
const initialState = {
    account: [],
    loading: true
}

export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_ACCOUNT":
            return { ...state, account: action.payload, loading: false }
        case "SET_ACCOUNT":
            return { ...state, ...action.payload, loading: false }
        case "DELETE_ACCOUNT":
            return { ...state, ...action.payload, loading: false }
        default:
            return state
    }
}