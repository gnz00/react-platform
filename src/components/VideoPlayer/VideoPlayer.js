var DEFAULT_HEIGHT = 800;
var DEFAULT_WIDTH = 600;
var DEFAULT_ASPECT_RATIO = (9 / 16);
var DEFAULT_ADJUSTED_SIZE = 0;
var DEFAULT_RESIZE_DEBOUNCE_TIME = 500;
var DEFAULT_VIDEO_OPTIONS = {
  preload: 'auto',
  autoplay: true,
  controls: true
};

function noop() {}

import vjs from 'videojs';
import _ from 'lodash';
import cx from 'classnames';
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './VideoPlayer.css';

@withStyles(styles)
class VideoPlayer extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    endlessMode: PropTypes.bool,
    options: PropTypes.object,
    onReady: PropTypes.func,
    eventListeners: PropTypes.object,
    resize: PropTypes.bool,
    resizeOptions: PropTypes.shape({
      aspectRatio: PropTypes.number,
      shortWindowVideoHeightAdjustment: PropTypes.number,
      defaultVideoWidthAdjustment: PropTypes.number,
      debounceTime: PropTypes.number
    }),
    vjsDefaultSkin: PropTypes.bool,
    vjsBigPlayCentered: PropTypes.bool,
    children: PropTypes.element,
    dispose: PropTypes.bool,
    onNextVideo: PropTypes.func
  };

  static defaultProps = {
    endlessMode: false,
    options: DEFAULT_VIDEO_OPTIONS,
    onReady: noop,
    eventListeners: {},
    resize: false,
    resizeOptions: {},
    vjsDefaultSkin: true,
    vjsBigPlayCentered: true,
    onNextVideo: noop
  };

  componentDidMount() {
    this.mountVideoPlayer();
  };

  componentWillReceiveProps(nextProps) {

    var isEndless = this.props.endlessMode;
    var willBeEndless = nextProps.endlessMode;

    if (isEndless !== willBeEndless) {
      if (willBeEndless) {
        this.addEndlessMode();
      } else {
        this.removeEndlessMode();
      }
    }

    var isResizable = this.props.resize;
    var willBeResizeable = nextProps.resize;

    if (isResizable !== willBeResizeable) {
      if (willBeResizeable) {
        this.addResizeEventListener();
      } else {
        this.removeResizeEventListener();
      }
    }

    var currentSrc = this.props.src;
    var newSrc = nextProps.src;

    if (currentSrc !== newSrc) {
      this.setVideoPlayerSrc(newSrc);
    } else if (isEndless === willBeEndless) {
      this.syncCurrentTime(nextProps.currentTime);
      //this.restartVideo();
    }
  };

  shouldComponentUpdate() {
    return false;
  };

  componentWillUnmount() {
    this.unmountVideoPlayer();
  };

  getVideoPlayer() {
    return this._player;
  };

  getVideoPlayerEl() {
    return ReactDOM.findDOMNode(this.refs.videoPlayer);
  };

  getVideoPlayerOptions() {
    return _.defaults(
      {}, this.props.options, {
      height: this.props.resize ? 'auto' : (this.props.height || DEFAULT_HEIGHT),
      width: this.props.resize ? 'auto' : (this.props.width || DEFAULT_WIDTH)
    }, DEFAULT_VIDEO_OPTIONS);
  };

  getVideoResizeOptions() {
    return _defaults({}, this.props.resizeOptions, {
      aspectRatio: DEFAULT_ASPECT_RATIO,
      shortWindowVideoHeightAdjustment: DEFAULT_ADJUSTED_SIZE,
      defaultVideoWidthAdjustment: DEFAULT_ADJUSTED_SIZE,
      debounceTime: DEFAULT_RESIZE_DEBOUNCE_TIME
    });
  };

  getResizedVideoPlayerMeasurements() {
    var resizeOptions = this.getVideoResizeOptions();
    var aspectRatio = resizeOptions.aspectRatio;
    var defaultVideoWidthAdjustment = resizeOptions.defaultVideoWidthAdjustment;

    var winHeight = this._windowHeight();

    var baseWidth = this._videoElementWidth();

    var vidWidth = baseWidth - defaultVideoWidthAdjustment;
    var vidHeight = vidWidth * aspectRatio;

    if (winHeight < vidHeight) {
      var shortWindowVideoHeightAdjustment = resizeOptions.shortWindowVideoHeightAdjustment;
      vidHeight = winHeight - shortWindowVideoHeightAdjustment;
    }

    return {
      width: vidWidth,
      height: vidHeight
    };
  };

  setVideoPlayerSrc(src) {
    this._player.src(src);
  };

  mountVideoPlayer() {
    var src = this.props.src;
    var options = this.getVideoPlayerOptions();

    this._player = vjs(this.getVideoPlayerEl(), options);

    var player = this._player;

    player.ready(this.handleVideoPlayerReady.bind(this));

    _.forEach(this.props.eventListeners, function(val, key) {
      player.on(key, val);
    });

    player.src(src);

    if (this.props.endlessMode) {
      this.addEndlessMode();
    }

    this.syncCurrentTime(this.props.currentTime);
  };

  unmountVideoPlayer() {
    this.removeResizeEventListener();
    this._player.dispose();
  };

  addEndlessMode() {
    var player = this._player;

    player.on('ended', this.handleNextVideo);

    if (player.ended()) {
      this.handleNextVideo();
    }
  };

  addResizeEventListener() {
    var debounceTime = this.getVideoResizeOptions().debounceTime;

    this._handleVideoPlayerResize = _.debounce(this.handleVideoPlayerResize, debounceTime);
    window.addEventListener('resize', this._handleVideoPlayerResize);
  };

  removeEndlessMode() {
    var player = this._player;

    player.off('ended', this.handleNextVideo);
  };

  removeResizeEventListener() {
    window.removeEventListener('resize', this._handleVideoPlayerResize.bind(this));
  };

  pauseVideo() {
    this._player.pause();
  };

  playVideo() {
    this._player.play();
  };

  restartVideo() {
    this._player.currentTime(0).play();
  };

  togglePauseVideo() {
    if (this._player.paused()) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  };

  handleVideoPlayerReady() {
    this
      .getVideoPlayerEl()
      .parentElement
      .removeAttribute('data-reactid');

    if (this.props.resize) {
      this.handleVideoPlayerResize();
      this.addResizeEventListener();
    }

    this.props.onReady();
  };

  syncCurrentTime(currentTime = 0) {

    console.log(currentTime);
    // Set the runtime
    if (currentTime) {
      let player = this.getVideoPlayer();

      console.log(player.seekable());

      if (player.paused()) {
        player.play();
        player.currentTime(currentTime);
        player.pause();
      } else {
        player.currentTime(currentTime);
      }
    }
  }

  handleVideoPlayerResize() {
    var player = this._player;
    var videoMeasurements = this.getResizedVideoPlayerMeasurements();

    player.dimensions(videoMeasurements.width, videoMeasurements.height);
  };

  handleNextVideo() {
    this.props.onNextVideo();
  };

  renderDefaultWarning() {
    return (
      <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>.
      </p>
    );
  };

  _windowHeight() {
    return window.innerHeight;
  };

  _videoElementWidth() {
    return this.getVideoPlayerEl().parentElement.parentElement.offsetWidth;
  };

  render() {
    var videoPlayerClasses = cx({
      'video-js': true,
      'vjs-default-skin': this.props.vjsDefaultSkin,
      'vjs-big-play-centered': this.props.vjsBigPlayCentered
    });

    return (
      <video ref="videoPlayer" className={videoPlayerClasses}>
        {this.props.children || this.renderDefaultWarning()}
      </video>
    );
  };

  _handleVideoPlayerResize = () => {};

};

module.exports = VideoPlayer;