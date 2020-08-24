// 要用require的方式 因为在node中使用的是require reuqire和impore混用会报错
require("./index.css");
const pic = require("./test.jpg");
const React = require("react");
// const ReactDom = require("react-dom");

// 函数组件
function App() {
  return (
    <div>
      <div>TEXT</div>
      <img src={pic} />
    </div>
  );
}

// 类组件 会报错 why？
// class App extends React.Component {
//   render() {
//     return <div>qwe</div>;
//   }
// }

module.exports = <App />;
// ReactDom.render(<App />, document.getElementById("root"));
