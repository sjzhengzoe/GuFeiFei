import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import close from 'images/close.svg';
import cass from 'classnames';
// 属性接口
interface Props {
  children?: React.ReactElement | string;
  cls?: string;
  visible?: Boolean;
  hasClose?: Boolean;
  title?: React.ReactElement | string;
  width?: string;
  height?: string;
  contentHeight?: string;
  hideScroll?: Boolean;
  onClickClose?: React.MouseEventHandler;
}

// 默认属性
let defaultProps: Props = {
  children: '',
  cls: '',
  visible: true,
  hasClose: true,
  width: '400px',
  height: 'auto',
  contentHeight: 'auto',
  hideScroll: true,
  onClickClose: () => {},
};

export default function Dialog(props: Props) {
  let finallyProps: Props = { ...defaultProps, ...props };
  let { visible } = finallyProps;
  document.getElementsByTagName('body')[0].removeAttribute('style');
  if (!visible) return null;
  document
    .getElementsByTagName('body')[0]
    .setAttribute('style', 'overflow:hidden');

  // 判断是否有根节点 如果没有则创建根节点在 body 下
  let root: HTMLElement = document.getElementById('DialogContainerRoot');
  if (!root) {
    root = document.createElement('div');
    root.setAttribute('id', 'DialogContainerRoot');
    document.getElementsByTagName('body')[0].appendChild(root);
  }

  return ReactDOM.createPortal(<DialogContent {...finallyProps} />, root);
}

// Dialog 内容
function DialogContent(props: Props) {
  let {
    cls,
    children,
    hasClose,
    title,
    contentHeight,
    width,
    height,
    hideScroll,
    onClickClose,
  } = props;
  return (
    <div className={`DialogComponent ${cls}`}>
      <div className="dialogContainer" style={{ width: width, height: height }}>
        {hasClose && (
          <img src={close} className="closeIcon" onClick={onClickClose} />
        )}
        {title && <div className="dialogTitle">{title}</div>}
        <div
          className={cass(`dialogContent`, { hideScroll })}
          style={{ height: contentHeight }}>
          {children}
        </div>
      </div>
    </div>
  );
}
