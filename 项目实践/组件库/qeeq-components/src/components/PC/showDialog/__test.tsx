import React from 'react';
import ReactDOM from 'react-dom';
import { showDialog } from 'qeeq-components';

function Demo() {
  function Test() {
    return <div>sujie</div>;
  }
  return (
    <div>
      <div
        onClick={() => {
          let dialog = showDialog({
            title: 'title',
            cls: 'myClassname',
            width: '400px',
            hideScroll: true,
            children: <Test />,
          });

          setTimeout(() => {
            dialog.hide();
          }, 2000);
        }}>
        点击展示弹窗
      </div>
    </div>
  );
}

ReactDOM.render(<Demo />, document.getElementById('root'));
