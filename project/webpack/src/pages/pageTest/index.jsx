import React, { Component } from "react";
import ReactDom from "react-dom";
import img from "global/img/test.jpg";
import "./index.scss";

class PageTest extends Component {
  render() {
    return (
      <>
        <div>1、文案输出：Hello World</div>
        <br />
        <div>2、字体引入：孔子说的对</div>
        <br />
        <div className="container">
          <span>3、图片输出：</span>
          <img src={img} alt="img" />
        </div>
      </>
    );
  }
}

ReactDom.render(<PageTest />, document.getElementById("root"));
