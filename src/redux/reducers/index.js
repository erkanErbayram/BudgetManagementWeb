import { combineReducers } from "redux";
import incomeReducer from "./incomeReducer"
import accountReducer from "./accountReducer"
import expenseReducer from "./expenseReducer"
import categoryReducer from "./categoryReducer"
import authReducer from "./authReducer"
export default combineReducers({ incomeReducer, accountReducer, expenseReducer, categoryReducer, authReducer });
