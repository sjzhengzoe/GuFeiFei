let nextShouldDealFiber = null;
let rootFiber;
let workRoot;
let currentRoot;
let currentFunFiber;
let currentHookIndex;

function createElement(type, props, ...children) {
  let realChildren = [];
  realChildren = children.map((item) => {
    if (typeof item !== "object") {
      // 统一text类型格式
      return {
        type: "text",
        props: {
          children: [],
          textValue: item,
        },
      };
    } else {
      return item;
    }
  });

  // 返回vdom
  return {
    type,
    props: {
      ...props,
      children: realChildren,
    },
  };
}

function render(vdom, container) {
  rootFiber = {
    type: "root",
    tag: "TAG_ROOT",
    stateNode: container,
    alternate: null,
    props: {
      children: [vdom],
    },
    updateQueue: null,
    effectTarge: "UPDATE",
    parent: null,
    child: null,
    sibling: null,
    firstEffect: null,
    nextEffect: null,
    lastEffect: null,
  };
  workRootAction();
}

// 构建workRoot树并渲染
function workRootAction() {
  workRoot = rootFiber;
  nextShouldDealFiber = workRoot;
  window.requestIdleCallback(createWorkRootAndMount);
}

function createWorkRootAndMount(deadline) {
  while (nextShouldDealFiber && deadline.timeRemaining() > 1) {
    nextShouldDealFiber = dealFiber(nextShouldDealFiber);
  }
  if (nextShouldDealFiber) {
    window.requestIdleCallback(createWorkRootAndMount);
    // 这里判断workRoot 因为同一个dom添加多次事件会有多次事件绑定
  } else if (workRoot) {
    mount(workRoot.child);
    currentRoot = workRoot;
    workRoot = null;
  }
}

// 处理fiber和children之间的关系
function dealFiber(fiber) {
  // 根据fiber的类型不同 进行不同的处理
  let dealFiberAndChildren = {
    TAG_ROOT: dealRootFiberAndChildren,
    TAG_TEXT: dealHostOrTextFiberAndChildren,
    TAG_HOST: dealHostOrTextFiberAndChildren,
    TAG_CLASS_COMPONENT: dealClassFiberAndChildren,
    TAG_FUNCTION_COMPONENT: dealFunctionFiberAndChildren,
  };
  dealFiberAndChildren[fiber.tag](fiber);

  if (fiber.child) {
    return fiber.child;
  }

  // 构建链表关系
  createMountLink(fiber);

  while (fiber) {
    if (fiber.sibling) return fiber.sibling;
    fiber = fiber.parent;
    if (fiber) createMountLink(fiber);
  }
}

// 处理root类型fiber
function dealRootFiberAndChildren(fiber) {
  if (currentRoot) workRoot.alternate = currentRoot;
  let children = fiber.props.children;
  reconcileChildren(fiber, children);
}

// 处理host || text类型fiber
function dealHostOrTextFiberAndChildren(fiber) {
  if (!fiber.alternate) fiber.stateNode = createDom(fiber);
  let children = fiber.props.children;
  reconcileChildren(fiber, children);
}

// 处理class类型fiber
function dealClassFiberAndChildren(fiber) {
  if (fiber.alternate) {
    fiber.stateNode.state = fiber.updateQueue.forceUpdate(fiber.stateNode.state);
  } else {
    fiber.stateNode = new fiber.type(fiber.props);
  }

  fiber.stateNode.internalFiber = fiber;

  let children = [fiber.stateNode.render()];
  reconcileChildren(fiber, children);
}

// 处理function类型fiber
function dealFunctionFiberAndChildren(fiber) {
  currentFunFiber = fiber;
  currentHookIndex = 0;
  fiber.hooks = [];
  let children = [fiber.type()];
  reconcileChildren(fiber, children);
}

// 处理children和fiber的关系
function reconcileChildren(fiber, children) {
  if (!children) return null;
  let currentChildFiber = fiber && fiber.alternate && fiber.alternate.child;
  // 记录上一个兄弟fiber
  let preFiber;
  children.map((item, index) => {
    let tag = "";
    if (item.type == "text") {
      tag = "TAG_TEXT";
    } else if (item.type.prototype && item.type.prototype.isReactComponent) {
      tag = "TAG_CLASS_COMPONENT";
    } else if (typeof item.type == "function") {
      tag = "TAG_FUNCTION_COMPONENT";
    } else if (typeof item.type == "string") {
      tag = "TAG_HOST";
    }

    let isSameType = currentChildFiber ? currentChildFiber.type == item.type : false;
    let newFiber = {
      type: item.type,
      props: item.props,
      tag,
      parent: fiber,
      updateQueue: isSameType ? currentChildFiber.updateQueue : new UpdateQueue(),
      alternate: isSameType ? currentChildFiber : null,
      stateNode: isSameType ? currentChildFiber.stateNode : null,
      effectTarge: isSameType ? "UPDATE" : "PLACEMENT",
      child: null,
      sibling: null,
      firstEffect: null,
      nextEffect: null,
      lastEffect: null,
    };

    if (tag == "TAG_FUNCTION_COMPONENT") delete newFiber.updateQueue;

    if (index == 0) {
      fiber.child = newFiber;
      preFiber = newFiber;
    } else {
      preFiber.sibling = newFiber;
      preFiber = newFiber;
    }

    if (currentChildFiber) currentChildFiber = currentChildFiber.sibling;
  });
}

// 构建effectList单链条
function createMountLink(fiber) {
  if (fiber.child && fiber.parent) {
    // 有孩子 => 非第一个孩子 || 第一个孩子
    fiber.parent.firstEffect ? (fiber.parent.lastEffect.nextEffect = fiber.firstEffect) : (fiber.parent.firstEffect = fiber.firstEffect);
    fiber.lastEffect.nextEffect = fiber;
    fiber.parent.lastEffect = fiber;
  }
  if (!fiber.child) {
    fiber.parent.lastEffect = fiber;
    // 无孩子 => 非第一个孩子 || 第一个孩子
    fiber.parent.firstEffect ? (fiber.parent.lastEffect.next = fiber) : (fiber.parent.firstEffect = fiber);
  }
}

class Components {
  constructor(props) {
    this.props = props;
    this.state = {};
  }
  setState(state) {
    let update = new Update(state);

    this.internalFiber.updateQueue.enqueueUpdate(update.state);
    workRootAction();
  }
}
Components.prototype.isReactComponent = true;

class Update {
  constructor(state) {
    this.state = state;
  }
}

class UpdateQueue {
  constructor() {
    this.firstUpdate = null;
    this.lastUpdate = null;
  }
  enqueueUpdate(update) {
    if (!this.lastUpdate) {
      this.firstUpdate = this.lastUpdate = update;
    } else {
      this.lastUpdate = this.lastUpdate.nextUpdate = update;
    }
  }

  forceUpdate(state) {
    let nowUpdate = this.firstUpdate;
    while (nowUpdate) {
      state = { ...state, ...nowUpdate };
      nowUpdate = nowUpdate.nextUpdate;
    }
    return state;
  }
}

function mount(fiber) {
  if (fiber.effectTarge == "UPDATE") {
    fiber.tag == "TAG_TEXT" && (fiber.stateNode.textContent = fiber.props.textValue);
    fiber.tag == "TAG_HOST" && updateDom(fiber);
  }

  if (fiber.effectTarge == "PLACEMENT") {
    let parentFiber = fiber.parent;
    let childFiber = fiber;
    while (parentFiber.tag == "TAG_CLASS_COMPONENT" || parentFiber.tag == "TAG_FUNCTION_COMPONENT") {
      parentFiber = parentFiber.parent;
    }
    while (childFiber.tag == "TAG_CLASS_COMPONENT" || childFiber.tag == "TAG_FUNCTION_COMPONENT") {
      childFiber = childFiber.child;
    }

    parentFiber.stateNode.appendChild(childFiber.stateNode);
  }

  if (fiber.child) mount(fiber.child);
  if (fiber.sibling) mount(fiber.sibling);
  if (fiber.parent.sibling) mount(fiber.parent.sibling);
}

export function useState(initState) {
  let state;
  let currentHook;
  if (currentFunFiber.alternate) {
    let beforeState = currentFunFiber.alternate.hooks[currentHookIndex].state;
    currentHook = {
      state: currentFunFiber.alternate.hooks[currentHookIndex].updateQueue.forceUpdate(beforeState),
      updateQueue: currentFunFiber.alternate.hooks[currentHookIndex].updateQueue,
    };
  } else {
    currentHook = {
      state: initState,
      updateQueue: new UpdateQueue(),
    };
  }
  state = currentHook.state;
  currentFunFiber.hooks.push(currentHook);

  function setState(state) {
    currentHook.updateQueue.enqueueUpdate(state);
    workRootAction();
  }

  currentHookIndex++;
  return [state, setState];
}

// ===================================================================================

function createDom(vdom) {
  const { type } = vdom;
  if (type == "text") {
    return document.createTextNode(vdom.props.textValue);
  }
  let dom = document.createElement(type);
  handleProps(vdom, dom);
  handleEvent(vdom, dom);
  return dom;
}

// 更新dom
function updateDom(fiber) {
  handleProps(fiber, fiber.stateNode);
  handleEvent(fiber, fiber.stateNode);
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

// 事件名处理
function eventTranslation(event) {
  let isEvent = event.match(/on([A-Z].*)$/);
  if (!isEvent) return null;
  let name = event.match(/on([A-Z].*)$/)[1];
  let eventName = `${name[0].toLowerCase()}${name.slice(1)}`;
  return eventName;
}

export default { createElement, render, Components };
