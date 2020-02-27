import React, { Component } from 'react';
import api from '../../services/api';

import Alert from '../../components/alert';
import './styles.css';

export default class Details extends Component {
  state = {
    group: {
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

  componentDidMount() {
    this.loadGroup();
  }

  loadGroup = async () => {
    const { group } = this.props.match.params;
    const response = await api.get(`/groups/${group}`);
    response.data
      ? this.setState({ group: response.data })
      : this.showAlert('Oops! Something went wrong');
  };

  deleteMember = async member => {
    const { group } = this.props.match.params;
    const response = await api.delete(`/group/${group}/member/${member}`);
    response.data.result
      ? this.loadGroup()
      : this.showAlert('Oops! Something went wrong');
  };

  addMember = async event => {
    event.preventDefault();
    const { group } = this.props.match.params;
    const { member } = this.state;

    if (!this.isEmptyOrSpaces(member.name) && !this.isEmptyOrSpaces(member.email)) {
      const response = await api.post(`/group/${group}/member`, member);
      if (response.data.result) {
        this.loadGroup();
        this.clearInputs();
        this.setState({ member: { name: '', email: '' } });
      } else {
        this.showAlert('Oops! Something went wrong');
      }
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
    const { member } = this.state;
    const target = event.target;
    const input = target.name;
    const value = target.value;

    input === 'name' ? (member.name = value) : (member.email = value);

    this.setState({ member });
  };

  clearInputs = () => {
    document.getElementById('input-name').value = '';
    document.getElementById('input-email').value = '';
  };

  render() {
    const { group, alert } = this.state;

    return (
      <div className="details-container">
        {alert.visible && <Alert text={alert.message} />}
        <h1>{group.name}</h1>
        <div className="add-container">
          <h3>Add new member</h3>
          <form>
            <input
              type="text"
              name="name"
              id="input-name"
              placeholder="Nome"
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
              Adicionar
            </button>
          </form>
        </div>
        <div className="members-container">
          <h3>Members</h3>
          <ul className="members-list">
            {group.members.map(member => (
              <li key={member._id} className="members-item">
                <p>Name: {member.name}</p>
                <p>E-mail: {member.email}</p>
                <button onClick={() => this.deleteMember(member._id)}>
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
