import React, { PropTypes, Component } from 'react';
import Link from "../Link";

class NavLink extends Component {

  static propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  };

  render() {
    return (
      <li>
        <Link to={this.props.to}>
          <span>
            <span className="bar"></span>
            <i className={`stream-${this.props.icon}`}></i>
            <span>{this.props.text}</span>
          </span>
        </Link>
      </li>
    )
  }

}

export default NavLink;
