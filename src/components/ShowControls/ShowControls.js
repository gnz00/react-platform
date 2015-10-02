/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './ShowControls.css';

import _ from "lodash";

/**
 * A search input similar to the one on the homepage of Twitch.tv.
 */
@withStyles(styles)
class ShowControls extends Component {

  toggleState(property) {
    this.props.toggleShowState(property);
  }

  render () {
    const showStateButtonText = ( this.props.isPlaying ? "Pause" : "Play" );

    return (
      <div className="ShowControls">
        <div className="topcoat-component">
          <button onClick={this.toggleState.bind(this, "isPlaying")} className="topcoat-button--large--cta">{showStateButtonText}</button>
        </div>

      </div>
    )
  }

}

export default ShowControls;
