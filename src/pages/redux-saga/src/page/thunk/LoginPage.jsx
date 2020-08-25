import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class LoginPage extends Component {
  render() {
    const { isLogin, loading, login } = this.props;
    if (isLogin) {
      return <Redirect to={{ pathname: "/user" }} />;
    } else {
      return <div onClick={login}>{loading ? "登录中ing" : "点击登录"}</div>;
    }
  }
}

export default connect(
  (state) => ({
    isLogin: state.isLogin,
    loading: state.loading,
  }),
  {
    login: () => (dispatch) => {
      dispatch({ type: "requestLogin" });

      setTimeout(() => {
        dispatch({ type: "requestSuccess" });
      }, 2000);
    },
  }
)(LoginPage);
