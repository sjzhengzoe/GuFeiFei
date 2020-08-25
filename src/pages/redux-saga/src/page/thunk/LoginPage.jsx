import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  render() {
    const { isLogin, loading, login, error } = this.props;
    const { name } = this.state;
    if (isLogin) {
      return <Redirect to={{ pathname: "/user" }} />;
    } else {
      return (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) =>
              this.setState({
                name: e.target.value,
              })
            }
          />
          <div onClick={() => login(name)}>
            {loading ? "登录中ing" : "点击登录"} {error ? error : null}
          </div>
        </>
      );
    }
  }
}

export default connect(
  // state => function
  (state) => ({
    isLogin: state.isLogin,
    loading: state.loading,
    error: state.error,
  }),
  // dispatch => function || object
  {
    // 1、thunk的使用方法
    //   login: () => (dispatch) => {
    //     dispatch({ type: "requestLogin" });

    //     setTimeout(() => {
    //       dispatch({ type: "requestSuccess" });
    //     }, 2000);
    //   },
    // 2、saga的使用方法
    login: (name) => ({
      type: "login",
      name,
    }),
  }
)(LoginPage);
