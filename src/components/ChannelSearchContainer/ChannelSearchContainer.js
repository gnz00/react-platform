/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ChannelSearchInput from '../ChannelSearchInput';
import ChannelSearchSelector from '../ChannelSearchSelector';
import ChannelActionCreator from '../../actions/ChannelActionCreator';
import ChannelStore from '../../stores/ChannelStore';
import _ from "lodash";
import filters from "../../utils/filters";

class ChannelSearchContainer extends Component {

  constructor(props) {
    super(props);

    var channels = ChannelStore.findAll() || [];
    this.state = {
      channels: this.props.channels || channels,
      filteredChannels: this.props.channels || channels,
      filterText: this.props.filterText || ""
    };
  }

  componentWillMount() {
    ChannelActionCreator.findAll();
  }

  // Listen for updates to the Channels
  componentDidMount() {
    this._onStoreChange__callback = this._onStoreChange.bind(this);
    ChannelStore.addChangeListener(this._onStoreChange__callback);
  }

  componentWillUnmount() {
    ChannelStore.removeChangeListener(this._onStoreChange__callback);
  }

  render() {
    return (
      <div className="ChannelSearchContainer">
        <ChannelSearchInput handleChange={this._onInputChange.bind(this)}/>
        <ChannelSearchSelector filteredChannels={this.getFilteredChannels()}/>
      </div>
    );
  }

  getFilteredChannels() {
    return _.filter(this.state.channels, function(channel) {
      return filters.compareKeysToString(channel.attributes, this.state.filterText);
    }.bind(this));
  }

  /** handler for search input change, is passed and consumed by ChannelSearchInput */
  _onInputChange(e) {
    this.setState({
      filterText: e.target.value
    });
  }

  _onStoreChange(event) {
    let channels = ChannelStore.findAll();
    this.setState({
      channels: channels,
    });
  }

  // Need to store the original callback so we can remove the event on unmount
  _onStoreChange__callback = null

}


export default ChannelSearchContainer;
