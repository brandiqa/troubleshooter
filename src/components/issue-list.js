import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Message, Icon, Card, Modal, Button } from 'semantic-ui-react';
import IssueCard from './issue-card';
import store from '../stores/issue-store';


@observer
class IssueList extends Component {

  componentDidMount() {
    store.fetch();
  }

  render() {
    const { issues, loading, errors, deleteOne, showErrors, hideErrors } = store;

    const fetchingMessage = (
      <Message icon info>
        <Icon name='circle notched' loading />
        <Message.Content>
           <Message.Header>Just one moment</Message.Header>
           We are fetching that content for you.
       </Message.Content>
      </Message>
    )

    const errorStyles = {
      backgroundColor: "#FFF6F6",
      color: '#9f3a38'
    }

    const errorModal = (
      <Modal open={showErrors}>
        <Modal.Header style={errorStyles}><Icon name='ban' />{errors.action}</Modal.Header>
        <Modal.Content style={errorStyles}>
          {errors.message}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => hideErrors() }>Close</Button>
        </Modal.Actions>
      </Modal>
    )

    const issueCardItems = issues.map(issue => ( <IssueCard key={issue._id} issue={issue} deleteIssue={deleteOne} /> ));
    const issueCards = (
      <Card.Group>
        {issueCardItems}
      </Card.Group>
    )

    return (
      <div>
        { loading && fetchingMessage }
        { errorModal }
        { issueCards }
      </div>
    )
  }
}

export default IssueList;
