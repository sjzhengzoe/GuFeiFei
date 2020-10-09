import MiniReact from "../../global/js/MiniReactTest4";

class Todo extends MiniReact.Components {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  addCount = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  };
  render() {
    const { count } = this.state;
    return (
      <div>
        <span onClick={() => this.addCount()}>add</span>
        <span>&nbsp;</span>
        <sapn>{count}</sapn>
      </div>
    );
  }
}

MiniReact.render(
  <div>
    <h1>title</h1>
    <p>content</p>
    <Todo />
    <ul>
      <li>1</li>
      <li>2</li>
      <li>
        <div>11</div>
        <div>22</div>
      </li>
      <li>
        <div>33</div>
        <div>44</div>
      </li>
      <Todo />
    </ul>
  </div>,
  document.getElementById("root")
);
