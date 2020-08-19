// React 尝试
import "./index.scss"
import React, {Component} from "react"
import ReactDom from "react-dom"
import img from "global/img/test.jpg"

class App extends Component {
  render() {
    return (
      <>
        <div>Hello World</div>
        <div>孔子说的对a</div>
        <div>
          <img src={img} alt="" />
        </div>
      </>
    )
  }
}

ReactDom.render(<App />, document.getElementById("root"))
