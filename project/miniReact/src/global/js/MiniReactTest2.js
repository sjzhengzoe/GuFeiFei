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
  nextShouldDealFiber ? window.requestIdleCallback(createWorkRootAndMount) : mount();
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
      if (index == 0) {
        // 创建一个新的fiber 作为fiber的child
        let childFiber = {
          type: item.type,
          dom: createDom(item),
          props: {
            children: item.props.children,
          },
          // childFiber的parent为fiber
          parent: fiber,
          child: null,
          sibling: null,
        };
        fiber.child = childFiber;
        preFiber = childFiber;
      } else {
        // 创建一个新的fiber 作为preFiber的sibling
        let siblingFiber = {
          type: item.type,
          dom: createDom(item),
          props: {
            children: item.props.children,
          },
          // siblingFiber的parent为fiber
          parent: fiber,
          child: null,
          sibling: null,
        };
        // 上一个兄弟fiber的兄弟则为siblingFiber
        preFiber.sibling = siblingFiber;
        preFiber = siblingFiber;
      }
    });
    // 返回下一个要处理的fiber为fiber的child
    return fiber.child;
  }

  if (fiber.sibling) return fiber.sibling;

  if (fiber.parent) return fiber.parent;
}

function mount() {
  let isStop = false;
  let root = workRoot;

  while (!isStop) {
    if (root.child) {
      let pre = root.child;
      root.dom.appendChild(root.child.dom);
      while (pre.sibling) {
        root.dom.appendChild(pre.sibling.dom);
        pre = pre.sibling;
      }
      root = root.child;
    } else if (root.sibling) {
      root = root.sibling;
    } else if (root.parent.sibling) {
      root = root.parent.sibling;
    } else {
      isStop = true;
    }
  }
}

export default { createElement, render };
