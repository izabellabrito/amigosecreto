import React, { Component } from 'react';

import './styles.css';

export default class Alert extends Component {
  render() {
    return (
      <div className="alert-container">
        <p>{this.props.text}</p>
      </div>
    );
  }
}
