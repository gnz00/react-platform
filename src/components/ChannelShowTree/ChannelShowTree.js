/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './ChannelShowTree.css';

import ActionCreator from '../../actions/ActionCreator';
import JsonApiStore from '../../stores/JsonApiStore';

import Link from "../Link";
import _ from "lodash";

import TreeView from "react-treeview";

@withStyles(styles)
class ChannelShowTree extends Component {

  static propTypes = {
    channel_id: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      shows: []
    };
  }

  // Send an action to update the channel store with the record that corresponds to the id
  componentWillMount() {
    // Tell the store to update show records for this channel
    ActionCreator.findRelatedRecords("shows", "channels", this.props.channel_id);
  }

  // Listen for updates to the Channels
  componentDidMount() {
    this._onStoreChange__callback = this._onStoreChange.bind(this);
    JsonApiStore.addChangeListener(this._onStoreChange__callback, "shows");
  }

  componentWillUnmount() {
    JsonApiStore.removeChangeListener(this._onStoreChange__callback, "shows");
  }


  render() {
    return (
      <div className="ChannelShowTree">
      {
        this.state.shows.map(function(item) {
          return (
            <div key={item.id}>
              <Link
                to={"/shows/" + item.id}
                children=<span>{item.attributes.title}</span>
              />
            </div>
          );
        })
      }
      </div>
    );
  }

  _onStoreChange(event) {
    let shows = JsonApiStore.findRelatedRecords("shows", "channels", this.props.channel_id);
    this.setState({
      shows: shows
    });
  }

  // Need to store the original callback so we can remove the event on unmount
  _onStoreChange__callback = null

}

export default ChannelShowTree;
