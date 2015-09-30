/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import Location from '../../core/Location';

class ChannelSearchSelectorItem extends Component {

  handleClick() {
    Location.pushState(null, "/channels/" + this.props.channel.id);
  }

  render() {
    var attributes = this.props.channel.attributes;
    return (
      <div className="ChannelSearchSelectorItem" onClick={this.handleClick.bind(this)}>
        <div className="thumbnail">
          <img width="38" height="38" alt={attributes.title} src={attributes.thumbnailUrl}/>
        </div>
        <div className="ChannelSummary">
          <span>{attributes.title}</span>
          <span>{attributes.description}</span>
        </div>
      </div>
    );
  }

}

export default ChannelSearchSelectorItem;
