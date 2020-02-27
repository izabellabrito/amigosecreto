import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import './styles.css';

class Header extends Component {
  state = {
    userName: 'username'
  };

  componentDidMount() {
    const user = this.getLocalStorage();
    if (user !== null) {
      this.setState({ userName: user.name });
    }
  }

  logout = () => {
    localStorage.removeItem('user-authenticate');
    this.props.history.push('/');
    console.log(this.props);
  };

  getLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user-authenticate'));
  };

  render() {
    const { userName } = this.state;
    let header = null;
    if (this.props.history.location.pathname !== '/' && this.props.history.location.pathname !== '/signUp') {
      header = (
        <div className="header-container">
          <div className="user-info">Hello, {userName}!</div>
          <div className="user-actions">
            <Link to="/main" id="back">
              Home
            </Link>
            <span id="logout" onClick={this.logout}>
              Logout
            </span>
          </div>
        </div>
      );
    }

    return <div>{header}</div>;
  }
}

export default withRouter(Header);
