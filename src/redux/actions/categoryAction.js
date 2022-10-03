import axios from 'axios';

export const getCategory = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/category");
        dispatch({
            type: "GET_CATEGORY",
            payload: data
        })
    } catch (error) {

    }
}

export const setCategory = ({ categoryName }) => async (dispatch) => {
    try {
        const body = { categoryName };
        const { data } = await axios.post("/api/category", body);
        dispatch({
            type: "SET_CATEGORY",
            payload: data
        })
    } catch (error) {

    }
}