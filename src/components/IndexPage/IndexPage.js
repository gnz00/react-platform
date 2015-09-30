/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './IndexPage.css';
import ChannelSearchContainer from '../ChannelSearchContainer';
import _ from "lodash";

@withStyles(styles)
class IndexPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    var channels = _.filter(this.props.data, function(item) {
      return item.type === 'channels';
    });
    const title = 'Index Page';
    this.context.onSetTitle(title);
    return (
      <ChannelSearchContainer channels={channels}/>
    );
  }

}

export default IndexPage;
