const initialState = {
    category: [],
    loading: true
}

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_CATEGORY":
            return { ...state, category: action.payload, loading: false }
        case "SET_CATEGORY":
            return { ...state, ...action.payload, loading: false }
        default:
            return state
    }
}