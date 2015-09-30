/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './ChannelPage.css';
import ChannelStore from "../../stores/ChannelStore";
import ChannelActionCreator from '../../actions/ChannelActionCreator';
import ChannelShowTree from '../ChannelShowTree';
import _ from "lodash";

import TreeView from "react-treeview";

@withStyles(styles)
class ChannelPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    // Load channel from memory if it's available
    let channel = ChannelStore.findRecord(props.channel_id) || {};
    this.state = {
      channel: this.props.channel || channel
    };
  }

  // Send an action to update the channel store with the record that corresponds to the id
  componentWillMount() {
    ChannelActionCreator.findRecord(this.props.channel_id);
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
    const title = ( this.state.channel.attributes ? this.state.channel.attributes.title : "Loading...");
    this.context.onSetTitle(title);
    return (
      <div className="ChannelPage">
        <div className="ChannelHeader">
          <h1>{title}</h1>
        </div>
        <ChannelShowTree channel_id={this.props.channel_id}/>
      </div>
    );
  }

  _onStoreChange(event) {
    let channel = ChannelStore.findRecord(this.props.channel_id);
    this.setState({
      channel: channel
    });
  }

  // Need to store the original callback so we can remove the event on unmount
  _onStoreChange__callback = null

}

export default ChannelPage;
