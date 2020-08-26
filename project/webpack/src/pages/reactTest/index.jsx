import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";

class ReactTest extends Component {
  render() {
    return <div className="text">reactTest</div>;
  }
}

ReactDOM.render(<ReactTest />, document.getElementById("root"));
