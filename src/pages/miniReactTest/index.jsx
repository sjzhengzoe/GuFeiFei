import MiniReact, { Component } from "MiniReact";
import "./index.scss";

class Text extends Component {
  render() {
    const { name, onClick } = this.props;
    return (
      <div>
        <span className="text" onClick={onClick}>
          Hello {name}
        </span>
      </div>
    );
  }
}

MiniReact.render(
  <div className="container">
    <Text onClick={() => console.log("点击了类组件的text")} name="sujie">
      123
    </Text>
    <div className="first">第一个div</div>
    <div>
      <div className="seconed">第二个div</div>
    </div>
    <div>
      <i className="third" onClick={() => console.log("点击啦~")}>
        i标签 点击一下
      </i>
    </div>
  </div>,
  document.getElementById("root")
);