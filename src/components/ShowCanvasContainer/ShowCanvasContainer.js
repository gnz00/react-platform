/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './ShowCanvasContainer.css';

import ShowCanvasEvent from "../ShowCanvasEvent";

@withStyles(styles)
class ShowCanvasContainer extends Component {

  render () {
    return (
      <div className="ShowCanvasContainer">
        {
          this.props.currentEvents.map((e) => {
            return <ShowCanvasEvent
              key={"event_" + e.id}
              currentRuntime={this.props.currentRuntime}
              currentEvent={e} />
          })
        }
      </div>
    )
  }

}

export default ShowCanvasContainer;
