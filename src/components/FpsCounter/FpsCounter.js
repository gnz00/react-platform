import React, { PropTypes, Component } from 'react';

class FpsCounter extends Component {

  getFPS() {
    let elapsed = Date.now() - this.props.startTime;
    return (this.props.frameCount / elapsed) * 1000;
  }

  render() {
    return (
      <div className="FpsCounter">
        FPS: {this.getFPS().toFixed(2)}
      </div>
    )
  }

}

export default FpsCounter;
