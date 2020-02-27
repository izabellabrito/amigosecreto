import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Alert from '../../components/alert';
import './styles.css';

export default class SignUp extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    alert: {
      message: '',
      visible: false
    }
  };

  checkPassword = event => {
    event.preventDefault();
    const { password, confirmPassword } = this.state;

    password === confirmPassword
      ? this.createUser()
      : this.showAlert('Passwords do not match');
  };

  createUser = async () => {
    const { name, username, password } = this.state;

    if (!this.isEmptyOrSpaces(name) && !this.isEmptyOrSpaces(username) && !this.isEmptyOrSpaces(password)) {
      const response = await api.post('/signUp', {
        name,
        username,
        password
      });

      response.data.result
        ? this.showAlert(
            'User created! Log in with the username and password you just created.',
            10000
          )
        : this.showAlert('Oops! Something went happened!');
    } else {
      this.showAlert('Please, fill all inputs');
    }
  };

  isEmptyOrSpaces = str => {
    return str === null || str.match(/^ *$/) !== null;
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
      <div className="signup-container">
        {alert.visible && <Alert text={alert.message} />}
        <h1>
          <Link to="/">🡠</Link>Start here!
        </h1>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            onChange={this.handleInputChange}
          />
          <button type="submit" onClick={this.checkPassword}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
