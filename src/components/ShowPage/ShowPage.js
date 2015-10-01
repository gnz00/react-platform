/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './ShowPage.css';

import JsonApiStore from "../../stores/JsonApiStore";
import ActionCreator from '../../actions/ActionCreator';

import VideoPlayer from "../VideoPlayer";

@withStyles(styles)
class ShowPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      show: {},
      videos: []
    };
  }

  // Send an action to update the show store with the record that corresponds to the id
  componentWillMount() {
    ActionCreator.findRecord(this.props.show_id, "shows");
    ActionCreator.findRelatedRecords("videos", "shows", this.props.show_id);
  }

  // Listen for updates to the Shows
  componentDidMount() {
    this._onStoreChange__callback = this._onStoreChange.bind(this);
    JsonApiStore.addChangeListener(this._onStoreChange__callback, "shows");
    JsonApiStore.addChangeListener(this._onStoreChange__callback, "videos");
  }

  componentWillUnmount() {
    JsonApiStore.removeChangeListener(this._onStoreChange__callback, "shows");
    JsonApiStore.removeChangeListener(this._onStoreChange__callback, "videos");
  }


  render() {
    const title = ( this.state.show.attributes ? this.state.show.attributes.title : "Loading...");
    this.context.onSetTitle(title);

    return (
      <div className="ShowPage">
        <div className="ShowHeader">
          {title}
        </div>
        {
          this.state.videos.map(function(video) {
            return (
              <VideoPlayer
                key={video.id}
                src={video.attributes.src} />
            )
          })
        }
      </div>
    );
  }

  _onStoreChange(event) {
    let show = JsonApiStore.findRecord(this.props.show_id, "shows");
    let videos = JsonApiStore.findRelatedRecords("videos", "shows", this.props.show_id);

    this.setState({
      show: show,
      videos: videos
    });
  }

  // Need to store the original callback so we can remove the event on unmount
  _onStoreChange__callback = null;

}

export default ShowPage;
