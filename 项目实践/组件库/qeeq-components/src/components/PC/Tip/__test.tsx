import React from 'react';
import ReactDOM from 'react-dom';
import { Tip } from 'qeeq-components';

function Text() {
  return (
    <div>
      <div>这是一段要展示的 Tip</div>
      <div>这是一段 hover 后需要展示 Tip 的文案</div>
      <div>这是一段 hover 后需要展示 Tip 的文案</div>
      <div onClick={() => console.log('点击 inner 成功')}>这是一个按钮</div>
    </div>
  );
}

ReactDOM.render(
  <div onClick={() => console.log('点击 outter 成功')}>
    <Tip cls="myClassName" content={<Text />}>
      <div style={{ width: '200px' }}>
        这是 hover 的范围 这是 hover 的范围这是 hover 的范围这是 hover
        的范围这是
      </div>
    </Tip>
  </div>,
  document.getElementById('root')
);
