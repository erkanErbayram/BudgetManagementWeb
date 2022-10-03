const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
};
export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "USER_LOADED":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case "REGISTER_SUCCESS":
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case "REGISTER_FAIL":
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
            };
        case "LOGIN_SUCCESS":
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case "AUTH_ERROR":
        case "LOGIN_FAIL":
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: payload
            };
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
}