import axios from "axios";

export const getIncome = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/income");
    dispatch({
      type: "GET_INCOME",
      payload: data
    });
  } catch (error) {}
};

export const setIncome = ({
  account,  title, amount, date
}) => async dispatch => {
  try {
    const body = {   account,  title, amount, date };
    const { data } = await axios.post("/api/income", body);
    dispatch({
      type: "SET_INCOME",
      payload: data
    });
  } catch (error) {}
};

export const deleteIncome = ({ id }) => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/income/delete/${id}`);
    dispatch({
      type: "DELETE_INCOME",
      payload: data
    });
  } catch (error) {}
};
