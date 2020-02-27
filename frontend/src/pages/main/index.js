import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Alert from '../../components/alert';
import './styles.css';

export default class Main extends Component {
  state = {
    groups: [],
    alert: {
      message: '',
      visible: false
    }
  };

  componentDidMount() {
    this.loadGroups();
  }

  loadGroups = async () => {
    const user = JSON.parse(localStorage.getItem('user-authenticate'));
    const response = await api.get(`/groups/by/${user._id}`);

    response.data
      ? this.setState({ groups: response.data })
      : this.showAlert('Oops! Something went wrong...');
  };

  deleteGroup = async id => {
    const response = await api.delete(`/group/${id}`);
    response.data.result
      ? this.loadGroups()
      : this.showAlert('Oops! Something went wrong...');
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

  render() {
    const { groups, alert } = this.state;

    return (
      <div className="main-container">
        {alert.visible && <Alert text={alert.message} />}
        <div className="mines">
          <h1>Secret groups</h1>
          <ul className="group-list">
            <li className="group-item add">
              <Link to="/new">Create new one</Link>
            </li>
            {groups.map(group => (
              <li key={group._id} className="group-item">
                <h6>{group.name}</h6>
                <div className="buttons">
                  <Link to={`/details/${group._id}`}>Detalhes</Link>
                  <button onClick={() => this.deleteGroup(group._id)}>
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
