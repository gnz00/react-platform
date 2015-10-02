/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './ShowRuntimeBar.css';

import ReactDOM from 'react-dom';

/**
 * A search input similar to the one on the homepage of Twitch.tv.
 */
@withStyles(styles)
class ShowRuntimeBar extends Component {

  constructor(props) {
    super(props);
    this.colors = [];
    this.width = 0;

    for(var i = 0; i <= 100; i++) {
      this.colors.push(rainbow(20000, 20000 * Math.random()));
    }
  }

  componentDidMount() {
    this.width =  ReactDOM.findDOMNode(this).offsetWidth;
  }

  componentDidUpdate() {
    this.updateRuntimeIndicatorOffset();
  }

  updateRuntimeIndicatorOffset() {
    let RuntimeIndicator = ReactDOM.findDOMNode(this.refs.RuntimeIndicator);
    let offset = (this.props.currentRuntime / this.props.totalRuntime) * this.width;

    RuntimeIndicator.style.transform = 'translate3d(' + offset + 'px,0,0)'
  }

  getEventStyle(e) {
    let startTime = parseInt(e.attributes.startTimeOffset, 10);
    let duration = parseInt(e.attributes.duration, 10);
    let totalRuntime = parseInt(this.props.totalRuntime, 10);

    return {
      transform: 'translate3d(' + ((startTime / totalRuntime) * this.width) + 'px,0,0)',
      backgroundColor: this.colors[parseInt(e.id)],
      width: (((startTime + duration) / totalRuntime) * this.width) + "px",
      opacity: .6
    };
  }

  render () {
    return (
      <div className="ShowRuntimeBar"
        onMouseMove={this._onMouseMove.bind(this)}
        onMouseLeave={this._onMouseLeave.bind(this)}
        onClick={this._onMouseClick.bind(this)}>
        <div
          onMouseDown={this._onMouseDown.bind(this)}
          onMouseUp={this._onMouseUp.bind(this)}
          ref="RuntimeIndicator"
          className="RuntimeIndicator" >
        </div>
        {
          this.props.events.map((e) => {
            return (
              <div
                key={e.id}
                className="RuntimeIndicator"
                style={this.getEventStyle(e)} >
              </div>
            )
          })
        }
      </div>
    )
  }

  // Send the new currentRuntime upstream to ShowPage
  _onMouseClick(event) {
    if (!this._dragging) {
      let offsetX = event.clientX;
      this.props.updateCurrentRuntime((offsetX /  ReactDOM.findDOMNode(this).offsetWidth) * this.props.totalRuntime);
    }
    this._dragging = false;
  }

  _onMouseLeave(event) {
    this._dragging = false;
  }

  _onMouseDown(event) {
    this._dragging = true;
  }

  _onMouseMove(event) {
    if (this._dragging) {
      let offsetX = event.clientX;
      this.props.updateCurrentRuntime((offsetX /  ReactDOM.findDOMNode(this).offsetWidth) * this.props.totalRuntime);
    }
  }

  _onMouseUp(event) {
    this._dragging = false;
  }

  _dragging = false;
}

function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

export default ShowRuntimeBar;
