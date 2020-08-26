import React, { Component } from "react";
import ReactDOM from "react-dom";
// 业务组件
import LoginPage from "./LoginPage.jsx";
import UserPage from "./UserPage.jsx";
import PrivatePage from "./PrivatePage.jsx";
// 相关组件
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// 获取store
import store from "../../store/store.js";

class App extends Component {
  render() {
    return (
      // 提供一个store
      <Provider store={store}>
        <div>
          {/* 固定模块 不根据路由改变而改变 */}
          <h1>Redux - react-redux</h1>

          {/* BrowserRouter作为一个根组件 里面的内容根据路由进行切换  */}
          <BrowserRouter>
            {/* Link相当于a链接 */}
            <Link to="/login">登录</Link>
            <Link to="/user">用户中心</Link>

            {/* 可以不使用 但是使用比较方便 只渲染第一个路径匹配的 */}
            <Switch>
              {/* 匹配路由才会展示 例如此处 仅当路由为/user才渲染 */}
              <Route path="/login" component={LoginPage} />
              {/* 业务组件 */}
              <PrivatePage path="/user" component={UserPage} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
