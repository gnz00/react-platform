/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './ChannelShowTree.css';
import ChannelActionCreator from '../../actions/ChannelActionCreator';
import ShowStore from '../../stores/ShowStore';
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

    // Load shows from memory if they're available
    let shows = ShowStore.findRelatedRecordsById(props.channel_id, "channels") || [];
    this.state = {
      shows: this.props.shows || shows
    };
  }

  // Send an action to update the channel store with the record that corresponds to the id
  componentWillMount() {
    ChannelActionCreator.findShowRecordsByChannelId(this.props.channel_id);
  }

  // Listen for updates to the Channels
  componentDidMount() {
    this._onStoreChange__callback = this._onStoreChange.bind(this);
    ShowStore.addChangeListener(this._onStoreChange__callback);
  }

  componentWillUnmount() {
    ShowStore.removeChangeListener(this._onStoreChange__callback);
  }


  render() {
    console.log(this.state);
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
    let shows = ShowStore.findRelatedRecordsById(this.props.channel_id, "channels");
    this.setState({
      shows: shows
    });
  }

  // Need to store the original callback so we can remove the event on unmount
  _onStoreChange__callback = null

}

export default ChannelShowTree;
