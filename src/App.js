import React, { Component } from 'react';
import Control from './Control';
import Time from './Time';

import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      startTS: null,
      diff: null,
      suspended: 0,
      interval: null
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', (event) => this.onKeyDown(event));
  }

  onKeyDown(event) {
    const KEY_SPACE = 32;
    const KEY_ESCAPE = 27;

    if (![KEY_ESCAPE, KEY_SPACE].includes(event.keyCode)) {
      return;
    }

    event.preventDefault();

    switch (event.keyCode) {
      case KEY_SPACE:
        // start|stop on [space]
        this[!this.state.startTS ? 'onStart' : 'onStop']();
        break;

      case KEY_ESCAPE:
        // reset on [escape]
        this.onReset();
        break;
    }
  }

  onStart() {
    if (this.state.startTS) {
      // prevent multi clicks on start
      return;
    }
    this.setState((prevState) => ({
      startTS: +new Date() - prevState.suspended,
      interval: requestAnimationFrame(() => this.tick()),
      suspended: 0
    }));
  }

  onStop() {
    cancelAnimationFrame(this.state.interval);
    this.setState((prevState) => ({
      startTS: null,
      suspended: +prevState.diff
    }));
  }

  onReset() {
    cancelAnimationFrame(this.state.interval);
    this.setState(() => this.getInitialState());
  }

  tick() {
    this.setState((prevState) => ({
      diff: new Date(+new Date() - prevState.startTS),
      interval: requestAnimationFrame(() => this.tick()),
    }));
  }

  render() {
    return (
      <div className="Chrono">
        <Time date={this.state.diff} />
        <Control
          onStart={() => this.onStart()}
          onStop={() => this.onStop()}
          onReset={() => this.onReset()}
        />
      </div>
    )

  }
}

export default App;
