import MiniReact from "../../global/js/MiniReactTest2";

MiniReact.render(
  <div>
    <h1>title</h1>
    <p>content</p>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>
        <div>11</div>
        <div>22</div>
      </li>
    </ul>
  </div>,
  document.getElementById("root")
);
