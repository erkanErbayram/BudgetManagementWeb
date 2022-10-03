import axios from 'axios';

export const getAccount = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/account");
        dispatch({
            type: "GET_ACCOUNT",
            payload: data
        })
    } catch (error) {

    }
}

export const setAccount = ({ accountName, amount, accountType }) => async (dispatch) => {
    try {
        const body = { accountName, amount, accountType };
        const { data } = await axios.post("/api/account", body);
        dispatch({
            type: "SET_ACCOUNT",
            payload: data
        })
    } catch (error) {

    }
}

export const deleteAccount = ({ id }) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/account/delete/${id}`);
        dispatch({
            type: "DELETE_ACCOUNT",
            payload: data
        })
    } catch (error) {

    }
}