import "./index.scss"
import React, {Component} from "react"
import ReactDom from "react-dom"
import img from 'global/img/test.jpg'

class App extends Component {
  render() {
    return (
      <>
        <div>Hello World</div>
        <img src={img} alt=""/>
      </>
    )
  }
}

ReactDom.render(<App />, document.getElementById("root"))
