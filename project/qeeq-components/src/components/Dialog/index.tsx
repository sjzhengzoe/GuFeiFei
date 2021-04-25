import React from "react";
import "./index.scss";
import icon from "images/drop.svg";

class Dialog extends React.Component {
  render() {
    console.log("sujie images", icon);
    return (
      <div className="DialogComponent">
        这是一个 Dialog 组件
        <img src={icon} alt="" />
      </div>
    );
  }
}

export default Dialog;
