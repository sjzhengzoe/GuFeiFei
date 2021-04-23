import React from 'react';
import './index.scss';

export default function Text(props) {
  const { text } = props;
  let test: String = 'sujie text6';
  return (
    <div className="TextComponent">
      text:{text}2{test}
      <br />
      12
      <input type="text" />
    </div>
  );
}
