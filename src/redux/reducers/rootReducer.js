import { combineReducers } from "redux";
import userReducer from "./userReducer";
import todoReducer from "./todoReducer";

const rootReducer = combineReducers({
  users: userReducer,
  tasks: todoReducer
});

export default rootReducer;