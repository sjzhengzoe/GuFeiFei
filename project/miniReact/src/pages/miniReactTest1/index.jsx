import MiniReact, { Component } from "../../global/js/MiniReactTest1";
import "./index.scss";

class Text extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 1,
    };
  }
  static getDerivedStateFromProps() {
    console.log("Text [getDerivedStateFromProps]");
  }
  shouldComponentUpdate() {
    console.log("Text [shouldComponentUpdate]");
  }
  render() {
    const { name, onClick, children } = this.props;
    const { num } = this.state;
    console.log("Text [render]");
    return (
      <div>
        <span
          className="text"
          onClick={() => {
            onClick();
            this.setState({ num: num + 1 });
          }}
        >
          Hello {name} {num} {children}
        </span>
      </div>
    );
  }
  getSnapshotBeforeUpdate() {
    console.log("Text [getSnapshotBeforeUpdate]");
  }
  componentDidMount() {
    console.log("Text [componentDidMount]");
  }
  componentDidUpdate() {
    console.log("Text [componentDidUpdate]");
  }
  componentWillUnmount() {
    console.log("Text [componentWillUnmount]");
  }
}

class App extends Component {
  constructor(props) {
    console.log("App [constructor]");
    super(props);
    this.state = {
      name: "",
    };
  }
  static getDerivedStateFromProps(props, state) {
    console.log("App [getDerivedStateFromProps]", props, state);
    return state;
  }
  shouldComponentUpdate() {
    console.log("App [shouldComponentUpdate]");
    return true;
  }
  render() {
    const { name } = this.state;
    console.log("App [render]", "state:", this.state, "props:", this.props);
    return (
      <div className="container">
        <input type="text" value={name} onChange={(e) => this.setState({ name: e.target.value })} />
        <Text onClick={() => console.log("点击啦~")} name={name}>
          <span>
            <br />
            <i>ignore children</i>
          </span>
        </Text>
        <div>name:{name}</div>
        <div className="first">第一个div</div>
        <div>
          <div className="seconed">第二个div</div>
        </div>
        <div>
          <i className="third" onClick={() => console.log("点击啦~")}>
            i标签 点击一下
          </i>
        </div>
      </div>
    );
  }
  getSnapshotBeforeUpdate() {
    console.log("App [getSnapshotBeforeUpdate]");
  }
  componentDidMount() {
    console.log("App [componentDidMount]");
  }
  componentDidUpdate() {
    console.log("App [componentDidUpdate]");
  }
  componentWillUnmount() {
    console.log("App [componentWillUnmount]");
  }
}

MiniReact.render(<App name="" />, document.getElementById("root"));
