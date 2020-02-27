import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/login2.jpg';
import api from '../../services/api';

import Alert from '../../components/alert';
import './styles.css';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    alert: {
      message: '',
      visible: false
    }
  };

  componentDidMount() {
    const isAuthenticate = this.checkLocalStorage();
    isAuthenticate === null ? this.render() : this.props.history.push('/main');
  }

  signIn = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    const response = await api.post('/signIn', {
      username,
      password
    });

    response.data.result
      ? this.authenticate(response.data.user)
      : this.showAlert('Username or Password is invalid');
  };

  authenticate = data => {
    localStorage.setItem('user-authenticate', JSON.stringify(data));
    this.props.history.push('/main');
  };

  checkLocalStorage = () => {
    return localStorage.getItem('user-authenticate');
  };

  showAlert = (message, time = 1500) => {
    this.setState({
      alert: { message, visible: true }
    });

    setTimeout(() => {
      this.setState({
        alert: { message, visible: false }
      });
    }, time);
  };

  handleInputChange = event => {
    const target = event.target;
    const input = target.name;
    const value = target.value;

    this.setState({ [input]: value });
  };

  render() {
    const { alert } = this.state;

    return (
      <div className="container">
        {alert.visible && <Alert text={alert.message} />}
        <div className="side-form">
          <img src={logo} alt="logo" />
        </div>
        <div className="form-container">
          <form>
            <h1>Welcome!</h1>
            <span>Username</span>
            <input
              type="text"
              placeholder="Enter your email"
              name="username"
              onChange={this.handleInputChange}
            />
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={this.handleInputChange}
            />
            <div className="buttons">
              <button type="submit" onClick={this.signIn}>
                Sign In
              </button>
              <Link to="/signUp">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
