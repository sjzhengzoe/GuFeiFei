import React, { Component } from "react";
import ReactDOM from "react-dom";
function* helloGenerator() {
  yield "hello";
  yield "hi";
  yield "bye";
  yield "ending";
}
const hg = helloGenerator();
console.log(hg.next());
console.log(hg.next());
console.log(hg.next());
console.log(hg.next());
console.log(hg.next());

class GeneratorPage extends Component {
  render() {
    return <div>GeneratorPage</div>;
  }
}

ReactDOM.render(<GeneratorPage />, document.getElementById("root"));
