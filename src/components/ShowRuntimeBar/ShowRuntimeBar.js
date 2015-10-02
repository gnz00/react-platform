/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class ShowRuntimeBar extends Component {

  render () {
    return (
      <div className="ShowRuntimeBar"
        onClick={this._onClick}>
        <div
          ref="RuntimeIndicator"
          className="RuntimeIndicator" >
        </div>
      </div>
    )
  }

  _onClick(event) {
    event.persist();
    event.stopPropagation();
    event.preventDefault();
    event.bubbles = false;
    if (event.nativeEvent.clientX == 0) {
      var tmp = {};
      Object.assign(tmp, event);
      console.trace(tmp);
    }
  }
}

export default ShowRuntimeBar;
