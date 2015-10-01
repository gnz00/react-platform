/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ChannelSearchInput from '../ChannelSearchInput';
import ChannelSearchSelector from '../ChannelSearchSelector';

import ActionCreator from '../../actions/ActionCreator';
import JsonApiStore from '../../stores/JsonApiStore';

import _ from "lodash";
import filters from "../../utils/filters";

class ChannelSearchContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      filteredChannels: [],
      filterText: ""
    };
  }

  componentWillMount() {
    ActionCreator.findAll("channels");
  }

  // Listen for updates to the Channels
  componentDidMount() {
    this._onStoreChange__callback = this._onStoreChange.bind(this);
    JsonApiStore.addChangeListener(this._onStoreChange__callback, "channels");
  }

  componentWillUnmount() {
    JsonApiStore.removeChangeListener(this._onStoreChange__callback, "channels");
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
    let channels = JsonApiStore.findAll("channels");
    this.setState({
      channels: channels,
    });
  }

  // Need to store the original callback so we can remove the event on unmount
  _onStoreChange__callback = null

}


export default ChannelSearchContainer;
