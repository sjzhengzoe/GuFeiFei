import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initState = {
  isLogin: false,
  loading: false,
  username: "sujie",
  error: "",
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case "requestLogin":
      return {
        ...state,
        loading: true,
      };
    case "requestSuccess":
      return {
        ...state,
        isLogin: true,
        loading: false,
      };
    default:
      return state;
  }
};
// 使用thunk 支持异步 不然会报错
const store = createStore(loginReducer, applyMiddleware(thunk));

export default store;
