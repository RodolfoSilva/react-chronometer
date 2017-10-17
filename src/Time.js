import React from 'react';
import './Time.css';

const padStart = (number) => {
  return number < 10 ? '0' + number : number;
}

const formatTime = (date) => {
  let seconds = 0;
  let minutes = 0;
  let hundredths = 0;

  if (date) {
    seconds = date.getSeconds();
    minutes = date.getMinutes();

    hundredths = Math.round(date.getMilliseconds() / 10);
    hundredths = hundredths === 100 ? 0 : hundredths;
  }

  return `${padStart(minutes)}:${padStart(seconds)}:${padStart(hundredths)}`;
}

export default ({ date }) => <div className="Time">{formatTime(date)}</div>;
