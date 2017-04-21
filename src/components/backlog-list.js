import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Message, Icon, Card } from 'semantic-ui-react';
import BacklogCard from './backlog-card';
import Store from '../stores/store';

@observer
class BacklogList extends Component {

  store = null;
  ticketStore = null;

  constructor(props) {
    super(props);
    this.store = new Store('issues');
    this.ticketStore = new Store('tickets');
  }

  componentDidMount() {
    this.store.fetchAll();
  }

  render() {
    const { entities:issues, loading, errors } = this.store;
    const messages = errors.messages ? errors.messages.toJS() : [];

    const errorMessages = (
      <Message negative header={errors.global} list={messages.reverse()}/>
    )

    const fetchingMessage = (
      <Message icon info>
        <Icon name='circle notched' loading />
        <Message.Content>
           <Message.Header>Just one moment</Message.Header>
           We are fetching that content for you.
       </Message.Content>
      </Message>
    )

    const emptyMessage = (
      <Message icon info>
        <Icon name='warning circle' />
        <Message.Content>
           <Message.Header>No issues have been reported yet!</Message.Header>
           <p>Make sure users are aware of this tool.</p>
       </Message.Content>
      </Message>
    )

    const backlogCardItems = issues.map(issue => ( <BacklogCard key={issue._id} issue={issue} submitTicket={this.ticketStore.create} /> ));

    const issueCards = (
      <Card.Group>
        {backlogCardItems}
      </Card.Group>
    )

    return (
      <div>
        <h3>List of Unprocessed Issues</h3>
        { loading && fetchingMessage }
        { issues.length === 0 && !loading  && !errors.global && emptyMessage }
        { errors.global && errorMessages}
        { issueCards }
      </div>
    )
  }
}

export default BacklogList;
