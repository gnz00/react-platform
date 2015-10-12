/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './ShowPage.css';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import JsonApiStore from "../../stores/JsonApiStore";
import ActionCreator from '../../actions/ActionCreator';

import VideoPlayer from "../VideoPlayer";
import ShowCanvasContainer from "../ShowCanvasContainer";
import ShowControls from "../ShowControls";
import ShowRuntimeBar from "../ShowRuntimeBar";

import FpsCounter from "../FpsCounter";

import _ from "lodash";

@withStyles(styles)
class ShowPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      show: {},
      videos: [],
      events: [],
      currentRuntime: this.props.currentRuntime,
      activeEventIds: [],
      isPlaying: false,
      totalRuntime: 0,
      ticks: 0,
      elapsed: 0
    };
  }

  // Send an action to update the show store with the record that corresponds to the id
  componentWillMount() {
    ActionCreator.findRecord(this.props.show_id, "shows");
    ActionCreator.findRelatedRecords("videos", "shows", this.props.show_id);
    ActionCreator.findRelatedRecords("events", "shows", this.props.show_id);
  }

  // Listen for updates to the Shows
  componentDidMount() {
    this._onStoreChange__callback = this._onStoreChange.bind(this);
    JsonApiStore.addChangeListener(this._onStoreChange__callback, "shows");
    JsonApiStore.addChangeListener(this._onStoreChange__callback, "videos");
    JsonApiStore.addChangeListener(this._onStoreChange__callback, "events");

    requestAnimationFrame(this.tick.bind(this));
  }

  componentDidUpdate() {
    //requestAnimationFrame(this.tick.bind(this));
  }

  componentWillUnmount() {
    JsonApiStore.removeChangeListener(this._onStoreChange__callback, "shows");
    JsonApiStore.removeChangeListener(this._onStoreChange__callback, "videos");
    JsonApiStore.removeChangeListener(this._onStoreChange__callback, "events");
  }


  render() {
    const title = ( this.state.show.attributes ? this.state.show.attributes.title : "Loading..." );
    const events = this.getCurrentEvents(this.state.currentRuntime);
    this.context.onSetTitle(title);
    return (
        <div className="ShowPage">
          <div className="ShowHeader">
            {title}
            <FpsCounter
              startTime={this._firstTick}
              frameCount={this._ticks} />
          </div>
          <ShowCanvasContainer
            currentEvents={events}
            currentRuntime={this.state.currentRuntime} />
          <ShowControls isPlaying={this.state.isPlaying}
            toggleShowState={this.toggleState.bind(this)} />
          <ShowRuntimeBar ref="RuntimeBar"
            events={this.state.events}
            updateCurrentRuntime={this.updateCurrentRuntime.bind(this)}
            currentRuntime={this.state.currentRuntime}
            totalRuntime={this.state.totalRuntime} />
        </div>
    );
  }

  toggleState(property) {
    var object = {};
    object[property] = !this.state[property];
    this.setState(object);
  }

  updateCurrentRuntime(timeMs) {
    this.setState({
      currentRuntime: timeMs
    })
  }

  /**
   * Returns the current events given the current runtime
   * @param  {Integer} timeMs Time in milliseconds
   * @return {Object[]} Event Nodes to render given the current runtime
   * TODO: Possibility that this could miss a quick event, need to add some kind of padding to the time checking?
   */
  getCurrentEvents(timeMs) {
    let events = this.state.events;

    return _.filter(events, (e) => {
      let start = parseInt(e.attributes.startTimeOffset, 10);
      let end = start + parseInt(e.attributes.duration || 0);
      let options = JSON.parse(e.attributes.params);
      let requiresDismissal = options.requiresDismissal || false;
      let alwaysVisible = options.alwaysVisible || false;

      // Start time has been passed
      if (start <= timeMs) {
        // Does the event require dismissal or is the event always visible?
        if (requiresDismissal || alwaysVisible)
          return true;
        // Is the event still ongoing?
        if (end > timeMs)
          return true;
      }

      return false;
    });
  };

  /**
   * Returns the max runtime given the events provided
   * @return {Integer} Runtime in milliseconds
   */
  getTotalRuntime(events = this.state.events, show = this.state.show) {
    if (show.attributes && show.attributes.totalRuntime) {
      return show.attributes.totalRuntime;
    } else {
      // Find max value of event.startTimeOffset + event.duration
      let lastFutureTime = _.max(
        _.map(events, (e) => {
          return parseInt(e.attributes.startTimeOffset, 10) + parseInt(e.attributes.duration, 10) || 0;
        })
      );
      return lastFutureTime > 0 ? lastFutureTime : 0;
    }
  }
  // Does this update currentRuntime if say 'showState' is active, thus causing a re-render, where render is just a snapshot of the state?
  // How do we keep track of time deltas? setInterval is unreliable, we need to track using timestamps.
  tick() {
    requestAnimationFrame(this.tick.bind(this));
    let now = new Date().getTime(),
        delta = now - (this._lastTick || now),
        interval = 1000 / this._FPS;

    // Restrict the FPS
    if (delta > interval) {
      this._lastTick = now - (delta % interval);

      this._ticks++;

      if (this.state.isPlaying) {
        let newRuntime = this.state.currentRuntime + (delta - (delta % interval));
        this.updateCurrentRuntime(newRuntime);
      }
    }
  }

  _onStoreChange(event) {
    let show = JsonApiStore.findRecord(this.props.show_id, "shows");
    let videos = JsonApiStore.findRelatedRecords("videos", "shows", this.props.show_id);
    let events = JsonApiStore.findRelatedRecords("events", "shows", this.props.show_id);

    this.setState({
      show: show,
      videos: videos,
      events: events,
      totalRuntime: this.getTotalRuntime(events)
    });
  }

  // Need to store the original callback so we can remove the event on unmount
  _onStoreChange__callback = null;
  _lastTick = Date.now();
  _firstTick = Date.now();
  _ticks = 0;
  _FPS = 30;

}

export default ShowPage;
