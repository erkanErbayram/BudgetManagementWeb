import Axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await Axios.get("/api/user/me");
        dispatch({
            type: "USER_LOADED",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "AUTH_ERROR",
        });
    }
};

export const login = (email, password) => async (dispatch) => {

    const body = {
        email,
        password,
    };
    try {
        const res = await Axios.post("/api/user/login", body);
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            console.log(err.response);
        }
        dispatch({
            type: "LOGIN_FAIL",
            payload: errors
        });
    }
};

export const register = (email, password, adSoyad) => async (dispatch) => {

    const body = {
        email,
        password,
        adSoyad
    };
    try {
        const res = await Axios.post("/api/user/register", body);
        dispatch({
            type: "REGISTER_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            console.log(err.response);
        }
        dispatch({
            type: "REGISTER_FAIL",
            payload: errors
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: "LOGOUT",
    });
};