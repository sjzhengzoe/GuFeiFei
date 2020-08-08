import "./index.css"
import picture from "./test.jpg"
console.log(picture) // 这里输出的实际是处理过的路径
document.getElementById("test").src = picture
