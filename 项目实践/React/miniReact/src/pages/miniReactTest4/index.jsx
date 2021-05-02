import MiniReact, { useState } from "../../global/js/MiniReactTest4";

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
        <span onClick={() => this.addCount()}>add class</span>
        <span>&nbsp;</span>
        <sapn>{count}</sapn>
      </div>
    );
  }
}

function Fun() {
  const [state, setstate] = useState({ count: 0 });
  const [state2, setstate2] = useState({ count: 0 });
  console.log(state, state2);
  return (
    <div>
      <div>
        <span onClick={() => setstate({ count: state.count + 1 })}>add function</span>
        <span>&nbsp;</span>
        <sapn>{state.count}</sapn>
      </div>
      <div>
        <span onClick={() => setstate2({ count: state2.count + 1 })}>add function</span>
        <span>&nbsp;</span>
        <sapn>{state2.count}</sapn>
      </div>
    </div>
  );
}

MiniReact.render(
  <div>
    <h1>title</h1>
    <h2>content</h2>
    <ul>
      <Todo />
      <Todo />
      <Fun />
      <Fun />
    </ul>
  </div>,
  document.getElementById("root")
);
