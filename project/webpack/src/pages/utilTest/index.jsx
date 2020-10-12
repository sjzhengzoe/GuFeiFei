import React, { Component } from "react";
import ReactDOM from "react-dom";
import "global/util/test";

class ReactTest extends Component {
  render() {
    return <div>utilTest</div>;
  }
}

ReactDOM.render(<ReactTest />, document.getElementById("root"));
