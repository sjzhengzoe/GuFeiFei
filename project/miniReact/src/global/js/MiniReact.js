let componentDidMountList = [];
let componentDidUpdateList = [];
let classDomList = [];
let ComponentRenderIsFirst = true;

function createElement(type, props, ...children) {
  let realType = type;
  let realProps = props;
  let realChildren;

  // 处理子元素 将text类型转成统一对象格式
  realChildren = children.map((item) => {
    if (typeof item !== "object") {
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
  const { type, props } = vdom;
  let classObj = new type(props);

  if (type.getDerivedStateFromProps) {
    type.getDerivedStateFromProps(classObj.props, classObj.state);
  }

  if (!ComponentRenderIsFirst && classObj.shouldComponentUpdate) {
    classObj.shouldComponentUpdate();
  }

  // 获取真实dom
  let classVdom = classObj.render.bind(classObj)();
  let dom = handleVdom(classVdom);

  if (!ComponentRenderIsFirst && classObj.getSnapshotBeforeUpdate) classObj.getSnapshotBeforeUpdate();

  // 存储该真实dom到数组 并记录位置
  classDomList.push(dom);
  classObj.domIndex = classDomList.length - 1;

  // 判断是第一次mount还是update
  if (ComponentRenderIsFirst) {
    classObj.componentDidMount && componentDidMountList.push(classObj.componentDidMount);
  } else {
    classObj.componentDidUpdate && componentDidUpdateList.push(classObj.componentDidUpdate);
  }

  return dom;
}

// 属性名处理
function propsTranslation(props) {
  switch (props) {
    case "className":
      return "class";
    case "value":
      return "value";
    default:
      return null;
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
    let propsName = propsTranslation(key);
    propsName && ele.setAttribute(propsName, vdom.props[key]);
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
      // 有一种情况是 类组件的props里的children组件 当作为属性传到类组件中 children是一个数组 这里处理数组的情况
      if (Array.isArray(item)) {
        item.map((arrChild) => {
          let childrenEle = handleVdom(arrChild);
          // 将子元素append到父元素
          appenTo(childrenEle, parentEle);
        });
      } else {
        let childrenEle = handleVdom(item);
        // 将子元素append到父元素
        appenTo(childrenEle, parentEle);
      }
    });
  }

  // 返回的一定是一个dom元素
  return parentEle;
}

function render(vdom, container) {
  console.log("createElement处理好的vdom对象是", vdom);

  const ele = handleVdom(vdom);

  container.appendChild(ele);

  ComponentRenderIsFirst &&
    componentDidMountList.map((item) => {
      item();
    });
}
// 类组件
export class Component {
  constructor(props) {
    this.state = {};
    this.props = props;
  }
  setState(state) {
    ComponentRenderIsFirst = false;
    const beforeState = this.state;
    this.state = {
      ...beforeState,
      ...state,
    };

    if (this.constructor.getDerivedStateFromProps) {
      this.constructor.getDerivedStateFromProps(this.props, this.state);
    }

    this.shouldComponentUpdate && this.shouldComponentUpdate();

    // 获取新的dom
    const vdom = this.render();
    const dom = handleVdom(vdom);

    if (this.componentDidUpdate) componentDidUpdateList.push(this.componentDidUpdate);

    if (this.getSnapshotBeforeUpdate) this.getSnapshotBeforeUpdate();

    // 获取旧的dom
    const oldDom = classDomList[this.domIndex];
    // 获取旧的dom的父节点
    const parent = oldDom.parentNode;
    // 插入新的dom
    parent.insertBefore(dom, oldDom);
    // 移除旧的dom
    parent.removeChild(oldDom);
    // 保存新的dom到列表
    classDomList[this.domIndex] = dom;

    componentDidUpdateList.map((item) => {
      item();
      componentDidUpdateList.shift();
    });
  }
}

export default { createElement, render };
