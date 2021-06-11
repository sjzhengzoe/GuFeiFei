import React, { useState } from 'react';
import './index.scss';
import cass from 'classnames';

// 属性接口
interface Props {
  children?: React.ReactElement | string;
  cls?: string;
  content?: string | React.ReactElement;
  position?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'bottomMiddle'
    | 'topLeft'
    | 'topRight'
    | 'topMiddle';
  width?: string;
  height?: string;
  [propName: string]: any;
}

// 默认属性
let defaultProps: Props = {
  children: '',
  content: '',
  cls: '',
  position: 'bottomMiddle',
};

function Tip(props: Props) {
  let finallyProps: Props = { ...defaultProps, ...props };
  let { cls, position, content, children, width, height } = finallyProps;
  let [isVisible, setVisible] = useState(false);

  return (
    <div className={cass(`TipComponent ${cls}`)}>
      <div
        className="mainContent"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}>
        <div className="cursor_pointer">{children}</div>
        {isVisible && (
          <div
            className={cass(`tipContainer ${position}`)}
            style={{ width, height }}
            onClick={e => e.stopPropagation()}>
            <div className="tipContent">
              {content}
              <i className={cass(`arrow ${position}`)}></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tip;
