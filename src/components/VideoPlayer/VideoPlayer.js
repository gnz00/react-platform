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

import _ from 'lodash';
import cx from 'classnames';
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './VideoPlayer.css';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

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
    children: PropTypes.element,
    dispose: PropTypes.bool,
    onNextVideo: PropTypes.func
  };

  static defaultProps = {
    endlessMode: false,
    options: DEFAULT_VIDEO_OPTIONS,
    eventListeners: {},
    resize: false,
    resizeOptions: {}
  };

  getVideoPlayer() {
    return this._player;
  };

  componentDidUpdate() {
    this.refs.videoPlayer.crossOrigin = "anonymous";
    this.refs.videoPlayer.currentTime = this.props.currentTime;
    this.renderFrame();
  }

  componentWillReceiveProps(newProps) {
  }

  componentDidMount() {
    if (canUseDOM) {
      this._framebuffer = document.createElement('canvas');
      this.refs.videoPlayer.src = this.props.src;
      this.refs.videoPlayer.currentTime = this.props.currentTime;
      this.refs.videoPlayer.addEventListener('timeupdate', () => { this.renderFrame() });
    }
  }

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
    return _.defaults({}, this.props.resizeOptions, {
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

  unmountVideoPlayer() {
    this.removeResizeEventListener();
  };

  addResizeEventListener() {
    var debounceTime = this.getVideoResizeOptions().debounceTime;

    this._handleVideoPlayerResize = _.debounce(this.handleVideoPlayerResize, debounceTime);
    window.addEventListener('resize', this._handleVideoPlayerResize);
  };

  removeResizeEventListener() {
    window.removeEventListener('resize', this._handleVideoPlayerResize.bind(this));
  };

  pauseVideo() {
    this.refs.videoPlayer.pause();
  };

  playVideo() {
    this.refs.videoPlayer.play();
  };

  restartVideo() {
    this.refs.videoPlayer.currentTime = 0;
    this.refs.videoPlayer.play();
  };

  togglePauseVideo() {
    if (this._player.paused()) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  };

  handleVideoPlayerResize() {
    var player = this._player;
    var videoMeasurements = this.getResizedVideoPlayerMeasurements();

    player.dimensions(videoMeasurements.width, videoMeasurements.height);
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

  renderFrame() {
    let player = this.refs.videoPlayer;
    let viewport = this.refs.viewport;

    let viewportContext = this.refs.viewport.getContext('2d');
    let bufferContext = this._framebuffer.getContext('2d');

    // Draw video frame to the buffer
    bufferContext.drawImage(
      player,
      0,
      0,
      player.videoWidth,
      player.videoHeight,
      0,
      0,
      viewport.width,
      viewport.height
    );

    // Pull image data from buffer
    let data = bufferContext.getImageData(0, 0, viewport.width, viewport.height);

    // Draw buffer to viewport
    viewportContext.putImageData(data, 0, 0);
  }

  render() {
    return (
      <div className="videoPlayerContainer">
        <video ref="videoPlayer" style={{ display: "none" }}>
          {this.props.children || this.renderDefaultWarning()}
        </video>
        <canvas ref="viewport"/>
      </div>
    );
  };

  _handleVideoPlayerResize = () => {};
  _framebuffer = null;

};

module.exports = VideoPlayer;