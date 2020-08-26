import { createStore, applyMiddleware } from "redux";
// 1、thunk中间件
// import thunk from "redux-thunk";

// 2、saga中间件
import createSageMiddleware from "redux-saga";
import saga from "./saga.js";
const sagaMiddleware = createSageMiddleware();

// 初始状态
const initState = {
  isLogin: false,
  loading: false,
  username: "sujie",
  error: "",
};

// 通过saga put方法调用
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
    case "requestError":
      return {
        ...state,
        isLogin: false,
        loading: false,
        error: "pass error",
      };
    default:
      return state;
  }
};

// 使用中间件 解决不支持异步的问题
// 1、thunk中间件
// const store = createStore(loginReducer, applyMiddleware(thunk));

// 2、saga中间件
const store = createStore(loginReducer, applyMiddleware(sagaMiddleware));
// 开启saga 监控
sagaMiddleware.run(saga);

export default store;
