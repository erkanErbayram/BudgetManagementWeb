import axios from 'axios';

export const getExpense = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/expense");
        dispatch({
            type: "GET_EXPENSE",
            payload: data
        })
    } catch (error) {

    }
}
export const setExpense = ({ account, category, title, amount, date }) => async (dispatch) => {
    try {
        const body = { account, category, title, amount, date };
        console.log(body);
        const { data } = await axios.post("/api/expense", body);
        dispatch({
            type: "SET_EXPENSE",
            payload: data
        })
    } catch (error) {

    }
}

export const deleteExpense = ({ id }) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/expense/delete/${id}`);
        dispatch({
            type: "DELETE_EXPENSE",
            payload: data
        })
    } catch (error) {

    }
}