/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './ShowCanvasEvent.css';

import JsonApiStore from "../../stores/JsonApiStore";
import VideoPlayer from "../VideoPlayer";
import CanvasEventTypes from '../../constants/CanvasEventTypes';

import _ from "lodash";

@withStyles(styles)
class ShowCanvasEvent extends Component {

  componentDidMount() {
    const evt = this.props.currentEvent;
    const params = JSON.parse(evt.attributes.params);

    switch (evt.attributes.eventType) {

      case CanvasEventTypes.SHOW_VIDEO:
      // Might need to do some shit like this, http://html5doctor.com/video-canvas-magic/
      break;
    }
  }

  getEventBody() {
    const evt = this.props.currentEvent;
    const params = JSON.parse(evt.attributes.params);

    switch (evt.attributes.eventType) {

      case CanvasEventTypes.SHOW_VIDEO:
        let video = JsonApiStore.findRecord(params.videoId, "videos");
        let options = {
          autoplay: false,
          controls: false
        }
        let currentTime = (this.props.currentRuntime - parseInt(evt.attributes.startTimeOffset, 10)) / 1000;
        /**
         * TODO: SYNC VIDEOPLAYER WITH PARENT CURRENTRUNTIME
         */
        return <VideoPlayer
            ref="VideoPlayer"
            src={video.attributes.src}
            options={options}
            currentTime={currentTime}
          />
      break;

      default:
        return <div>{ evt.id }</div>
      break;
    }
  }

  render () {
    return (
      <div className="ShowCanvasEvent">
        { this.getEventBody() }
      </div>
    )
  }

}

export default ShowCanvasEvent;
