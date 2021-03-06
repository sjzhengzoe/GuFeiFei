// 存储下一个需要处理的fiber
let nextShouldDealFiber = null;
// 存储工作树
let workRoot;

function createElement(type, props, ...children) {
  let realType = type;
  let realProps = props;
  let realChildren = [];
  // 处理子元素 将text类型转成统一对象格式
  realChildren = children.map((item) => {
    if (typeof item !== "object") {
      return {
        type: "text",
        textValue: item,
        props: {
          children: [],
        },
      };
    } else {
      return item;
    }
  });

  // 返回处理好的数据
  return {
    type: realType,
    props: {
      ...realProps,
      children: realChildren,
    },
  };
}

function render(vdom, container) {
  // 创造根节点并存储到workRoot
  workRoot = {
    type: "root",
    dom: container,
    props: {
      children: [vdom],
    },
    parent: null,
    child: null,
    sibling: null,
  };
  // 指定下一个要处理的fiber为workRoot
  nextShouldDealFiber = workRoot;
}

// 浏览器有空余时间则进行渲染的相关工作处理
window.requestIdleCallback(createWorkRootAndMount);

// 构建workRoot 并且渲染

function createWorkRootAndMount(deadline) {
  // 有需要处理的fiber && 浏览器有空余 => workRoot并未构建完成
  while (nextShouldDealFiber && deadline.timeRemaining() > 1) {
    nextShouldDealFiber = dealFiber(nextShouldDealFiber);
  }
  // 没有需要处理的fiber => workRoot已构建完成，则进行dom插入操作
  // 有需要处理的fiber => 浏览器有空余时间 继续进行workRoot构建
  nextShouldDealFiber ? window.requestIdleCallback(createWorkRootAndMount) : mount(workRoot.child);
}

function createDom(vdom) {
  const { type } = vdom;

  if (type == "text") {
    return document.createTextNode(vdom.textValue);
  }

  return document.createElement(type);
}

// 处理当前fiber之间的关系 构建workRoot
function dealFiber(fiber) {
  let children = fiber.props.children;

  if (!fiber.child && children.length > 0) {
    // 记录上一个兄弟fiber
    let preFiber;
    children.map((item, index) => {
      // 创建一个new fiber
      let newFiber = {
        type: item.type,
        dom: createDom(item),
        props: {
          children: item.props.children,
        },
        parent: fiber,
        child: null,
        sibling: null,
      };

      if (index == 0) {
        fiber.child = newFiber;
        preFiber = newFiber;
      } else {
        preFiber.sibling = newFiber;
        preFiber = newFiber;
      }
    });
    // 返回下一个要处理的fiber为fiber的child
    return fiber.child;
  }

  if (fiber.sibling) return fiber.sibling;

  if (fiber.parent) return fiber.parent;
}

// 处理当前的fiber即把自己插入parent即可
function mount(fiber) {
  let parentDom = fiber.parent.dom;
  let childDom = fiber.dom;

  parentDom.appendChild(childDom);

  if (fiber.child) mount(fiber.child);
  if (fiber.sibling) mount(fiber.sibling);
  if (fiber.parent.sibling) mount(fiber.parent.sibling);
}

export default { createElement, render };
