import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivatePage extends Component {
  render() {
    const { path, component, isLogin } = this.props;

    // 已登录 渲染登录界面
    if (isLogin) {
      return <Route path={path} component={component} />;
    }

    // 未登录 重定向到 /login
    return <Redirect to={{ pathname: "/login", state: { redirect: path } }} />;
  }
}

export default connect((state) => ({
  isLogin: state.isLogin,
}))(PrivatePage);
