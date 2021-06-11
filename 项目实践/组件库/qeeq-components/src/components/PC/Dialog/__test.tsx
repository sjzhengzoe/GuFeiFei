import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Dialog } from 'qeeq-components';

function Demo() {
  const [state, setstate] = useState(false);
  return (
    <div>
      <div onClick={() => setstate(true)}>点击展示弹窗</div>
      <Dialog
        visible={state}
        title="title"
        cls="myClassname"
        hasClose={true}
        onClickClose={() => setstate(false)}
        contentHeight="156px"
        width="400px"
        height="200px"
        hideScroll={true}>
        <div>
          <div>这是 Dialog 的内容</div>
          <div>这是 Dialog 的内容</div>
          <div>这是 Dialog 的内容</div>
          <div>这是 Dialog 的内容</div>
          <div>这是 Dialog 的内容</div>
          <div>这是 Dialog 的内容</div>
          <div>这是 Dialog 的内容</div>
          <div>这是 Dialog 的内容</div>
          <div>这是 Dialog 的内容</div>
          <div>这是 Dialog 的内容</div>
          <div>这是 Dialog 的内容</div>
        </div>
      </Dialog>
    </div>
  );
}

ReactDOM.render(<Demo />, document.getElementById('root'));
