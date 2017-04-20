import React, { Component } from 'react';
import BacklogList from '../components/backlog-list';

class BacklogPage extends Component {
  render() {
    return (
      <div>
        <h2>Backlog Manager</h2>
        <BacklogList/>
      </div>
    )
  }
}

export default BacklogPage;
