import React, { Component } from 'react';
import api from '../../services/api';

import Alert from '../../components/alert';
import './styles.css';

export default class New extends Component {
  state = {
    group: {
      createdBy: JSON.parse(localStorage.getItem('user-authenticate')),
      name: '',
      members: []
    },
    member: {
      name: '',
      email: ''
    },
    alert: {
      message: '',
      visible: false
    }
  };

  create = async event => {
    event.preventDefault();
    const { group } = this.state;

    if (!this.isEmptyOrSpaces(group.name)) {
      const response = await api.post('/group', group);
      response.data.result
        ? this.props.history.push('/main')
        : this.showAlert('Oops! Something went wrong...');
    } else {
      this.showAlert('Please, insert the name of the group.');
    }
  };

  addMember = async event => {
    event.preventDefault();
    const { group, member } = this.state;

    if (!this.isEmptyOrSpaces(member.name) && !this.isEmptyOrSpaces(member.email)) {
      group.members.push(member);

      this.setState({ group, member: { name: '', email: '' } });
      this.clearInputs();
    } else {
      this.showAlert('Please, fill all inputs');
    }
  };

  deleteMember = async member => {
    const { group } = this.state;
    group.members = group.members.slice(member, 1);
    this.setState({ group });
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
    const { member } = this.state;
    const target = event.target;
    const input = target.name;
    const value = target.value;

    input === 'name' ? (member.name = value) : (member.email = value);

    this.setState({ member });
  };

  handleInputChangeGroup = event => {
    const { group } = this.state;
    const target = event.target;
    const value = target.value;

    group.name = value;

    this.setState(group);
  };

  clearInputs = () => {
    document.getElementById('input-name').value = '';
    document.getElementById('input-email').value = '';
  };

  render() {
    const { group, alert } = this.state;

    return (
      <div className="new-container">
        {alert.visible && <Alert text={alert.message} />}
        <div className="new-add-container">
          <form>
            <h2>Group name</h2>
            <input
              type="text"
              name="group"
              placeholder="Group name"
              onChange={this.handleInputChangeGroup}
            />
            <h2>Insert the members</h2>
            <input
              type="text"
              name="name"
              id="input-name"
              placeholder="Name"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="email"
              id="input-email"
              placeholder="Email"
              onChange={this.handleInputChange}
            />
            <button type="submit" onClick={this.addMember}>
              Add
            </button>
            <button type="submit" onClick={this.create}>
              Create
            </button>
          </form>
        </div>
        <div className="new-members-container">
          <h2>Members</h2>
          <h3>Group: {group.name}</h3>
          <ul className="new-members-list">
            {group.members.map((member, index) => (
              <li key={index} className="new-members-item">
                <p>Name: {member.name}</p>
                <p>E-mail: {member.email}</p>
                <button onClick={() => this.deleteMember(index)}>
                  Excluir membro
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
