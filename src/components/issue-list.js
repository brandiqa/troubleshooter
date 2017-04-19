import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Message, Icon, Card } from 'semantic-ui-react';
import IssueCard from './issue-card';
import Store from '../stores/store';


@observer
class IssueList extends Component {

  store = null;

  constructor(props) {
    super(props);
    this.store = new Store('issues');
  }

  componentDidMount() {
    this.store.fetchAll();
  }

  render() {
    const { entities:issues, loading, errors, deleteOne } = this.store;
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

    const issueCardItems = issues.map(issue => ( <IssueCard key={issue._id} issue={issue} deleteIssue={deleteOne} /> ));
    const issueCards = (
      <Card.Group>
        {issueCardItems}
      </Card.Group>
    )

    return (
      <div>
        <h3>List of Issues</h3>
        { loading && fetchingMessage }
        { errors.global && errorMessages}
        { issueCards }
      </div>
    )
  }
}

export default IssueList;
