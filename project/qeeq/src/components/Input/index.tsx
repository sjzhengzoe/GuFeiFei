import React from 'react';
import './index.scss';
import { Text } from 'qeeq';

export default function Input(props) {
  let { name } = props;
  console.log('sujie input');
  return (
    <div className="InputComponent">
      这是一个 input 组件
      <br />
      <Text text="sujie text" />
      <input type="text" value={name} />
    </div>
  );
}
