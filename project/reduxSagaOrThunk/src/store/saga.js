import { call, put, takeEvery } from "redux-saga/effects";

// 模拟调用接口
const toLogin = (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      name == "sujie" ? resolve() : reject();
    }, 2000);
  });
};

// Worker
function* loginHandle(action) {
  try {
    yield put({ type: "requestLogin" });
    yield call(toLogin, action.name);
    yield put({ type: "requestSuccess" });
  } catch (error) {
    yield put({ type: "requestError" });
  }
}

// Observer
function* loginObserver() {
  yield takeEvery("login", loginHandle);
}

export default loginObserver;
