/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './ChannelPage.css';

import JsonApiStore from "../../stores/JsonApiStore";
import ActionCreator from '../../actions/ActionCreator';

import ChannelShowTree from '../ChannelShowTree';
import _ from "lodash";

@withStyles(styles)
class ChannelPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      channel: {}
    };
  }

  // Send an action to update the channel store with the record that corresponds to the id
  componentWillMount() {
    ActionCreator.findRecord(this.props.channel_id, "channels");
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
    const title = ( this.state.channel.attributes ? this.state.channel.attributes.title : "");
    this.context.onSetTitle(title);

    return (
      <div className="ChannelPage">
        <div className="ChannelHeader">
          {title}
        </div>
        <ChannelShowTree channel_id={this.props.channel_id}/>
      </div>
    );
  }

  _onStoreChange(event) {
    let channel = JsonApiStore.findRecord(this.props.channel_id, "channels");
    this.setState({
      channel: channel
    });
  }

  // Need to store the original callback so we can remove the event on unmount
  _onStoreChange__callback = null

}

export default ChannelPage;
