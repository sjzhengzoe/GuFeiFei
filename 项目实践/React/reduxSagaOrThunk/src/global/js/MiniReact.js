function createElement(type, props, ...children) {
  let realType = type;
  let realProps = props;
  let realChildren;

  // 处理子元素 将text类型转成统一对象格式
  realChildren = children.map((item) => {
    if (typeof item == "string") {
      return {
        type: "text",
        textValue: item,
        children: [],
      };
    } else {
      return item;
    }
  });

  // 处理类组件 将children放在props里面
  if (typeof type == "function") {
    realType = type;
    realProps = {
      ...props,
      children: children,
    };
    realChildren = [];
  }

  // 返回处理好的数据
  return { type: realType, props: realProps, children: realChildren };
}

// 合并元素
function appenTo(child, parent) {
  parent.appendChild(child);
}

// 创建元素 此处有三种情况 1、text 2、类组件 3、div
function creatEle(vdom) {
  const { type } = vdom;

  // 处理 text
  if (type == "text") {
    return document.createTextNode(vdom.textValue);
  }
  // 处理类组件
  if (typeof type == "function") {
    // 类组件转成真实Dom
    return handleClassToDom(vdom);
  }
  // 处理div
  return document.createElement(type);
}

// 类组件转成真实Dom
function handleClassToDom(vdom) {
  // 此处children不使用 目前children应该是一直为空 因为存在于props.children
  const { type, props, children } = vdom;
  let classObj = new type(props);
  let classVdom = classObj.render();

  return handleVdom(classVdom);
}

// 属性名处理
function propsTranslation(props) {
  switch (props) {
    case "className":
      return "class";
    default:
      return props;
  }
}

// 事件名处理 onClick => click
function eventTranslation(event) {
  let isEvent = event.match(/on([A-Z].*)$/);
  if (!isEvent) return null;
  let name = event.match(/on([A-Z].*)$/)[1];
  let eventName = `${name[0].toLowerCase()}${name.slice(1)}`;
  return eventName;
}

// 绑定属性
function handleProps(vdom, ele) {
  if (!vdom.props) return null;
  for (let key in vdom.props) {
    ele.setAttribute(propsTranslation(key), vdom.props[key]);
  }
}

// 绑定事件
function handleEvent(vdom, ele) {
  if (!vdom.props) return null;
  for (let key in vdom.props) {
    let eventName = eventTranslation(key);
    eventName && ele.addEventListener(eventName, vdom.props[key]);
  }
}

// 将vdom转成真实dom返回
function handleVdom(vdom) {
  const type = vdom.type;
  // 此处vdom的type有三种 1、text 2、类组件 3、div 在该函数内部进行处理
  const parentEle = creatEle(vdom);

  // 处理属性和事件 text类型和类组件不需要处理
  if (type != "text" && typeof type != "function") {
    handleProps(vdom, parentEle);
    handleEvent(vdom, parentEle);
  }

  // 处理子元素 用递归的方式调用handleVdom获取
  if (vdom.children.length > 0) {
    vdom.children.map((item) => {
      let childrenEle = handleVdom(item);
      // 将子元素append到父元素
      appenTo(childrenEle, parentEle);
    });
  }

  // 返回的一定是一个dom元素
  return parentEle;
}

function render(vdom, container) {
  console.log("createElement处理好的vdom对象是", vdom);

  const ele = handleVdom(vdom);

  container.appendChild(ele);
}
// 类组件
export class Component {
  constructor(props) {
    this.props = props;
  }
}

export default { createElement, render };
