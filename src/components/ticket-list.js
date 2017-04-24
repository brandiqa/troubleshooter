import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import createStore from '../stores/store';

@observer
class TicketList extends Component {

  store = null;

  constructor(props) {
    super(props);
    this.store = createStore('tickets');
  }

  componentDidMount() {
    this.store.fetchAll();
  }


  render() {
    const { entities:tickets } = this.store;
    return (
      <Segment>
        <p>List of Tickets</p>
      </Segment>
    )
  }
}

export default TicketList;
