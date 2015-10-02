/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './ShowCanvasEvent.css';

import _ from "lodash";

@withStyles(styles)
class ShowCanvasEvent extends Component {

  render () {
    return (
      <div className="ShowCanvasEvent">
        {this.props.currentEvent.id}
      </div>
    )
  }

}

export default ShowCanvasEvent;
