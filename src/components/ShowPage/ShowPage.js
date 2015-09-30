/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './ShowPage.css';

@withStyles(styles)
class ShowPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'New User Registration';
    this.context.onSetTitle(title);
    return (
      <div className="ShowPage">
        <div className="ShowPage-container">
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }

}

export default ShowPage;
