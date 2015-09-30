/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

import ChannelSearchSelectorItem from '../ChannelSearchSelectorItem';

class ChannelSearchSelector extends Component {

  render() {
    var channels = this.props.filteredChannels;
    return (
        <div className="ChannelSearchSelector">
          {
            channels.map(function(channel, index) {
              return (
                <ChannelSearchSelectorItem key={channel.id} channel={channel}/>
              )
            })
          }
        </div>
    );
  }

}

export default ChannelSearchSelector;
