import React from 'react';

import './Control.css';

export default ({ onStart, onStop, onReset }) => (
  <div className="Control">
    <button onClick={onStart}>Start</button>
    <button onClick={onStop}>Stop</button>
    <button onClick={onReset}>Reset</button>
  </div>
);
