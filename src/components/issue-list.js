import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Message, Icon, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import IssueCard from './issue-card';
import createStore from '../stores/store';

@observer
class IssueList extends Component {

  store = null;

  constructor(props) {
    super(props);
    this.store = createStore('issues');
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

    const emptyMessage = (
      <Message icon info>
        <Icon name='warning circle' />
        <Message.Content>
           <Message.Header>You haven't reported any issues</Message.Header>
           <p>If you are facing an IT problem, please make a report here.</p>
           <Link to={'/issues/new'} className="ui button teal">Report an Issue</Link>
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
        { issues.length === 0 && !loading  && !errors.global && emptyMessage }
        { errors.global && errorMessages}
        { issueCards }
      </div>
    )
  }
}

export default IssueList;
