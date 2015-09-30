/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './ChannelSearchInput.css';
import Link from '../Link';

/**
 * A search input similar to the one on the homepage of Twitch.tv.
 */
@withStyles(styles)
class ChannelSearchInput extends Component {

  render () {
    var inputClass = (this.props.type == "large" ? "topcoat-text-input" : "topcoat-text-input--large");

    inputClass += (this.props.className ? " " + this.props.className : "");

    return (
      <div className="ChannelSearchInput">
        <input
          className={inputClass}
          type="text"
          placeholder="Search for channels"
          onChange={this.props.handleChange}
          onPaste={this.props.handleChange}
          >
        </input>
      </div>
    )
  }

}

export default ChannelSearchInput;
