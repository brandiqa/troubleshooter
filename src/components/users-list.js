import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Message, Icon, Card, Segment, Modal, Button } from 'semantic-ui-react';
import UserCard from './user-card';
import store from '../stores/users-store';



@observer
class UsersList extends Component {

  componentDidMount() {
    store.fetchUsers();
  }

  render() {
    const { users, loading, errors, deleteUser, showErrors, hideErrors } = store;

    const fetchingMessage = (
      <Message icon info>
        <Icon name='circle notched' loading />
        <Message.Content>
           <Message.Header>Just one moment</Message.Header>
           We are fetching that content for you.
       </Message.Content>
      </Message>
    )

    const errorMessage = (
      <Segment basic compact>
        <Message icon negative compact>
          <i className="close icon"></i>
          <Icon name='ban' />
          <Message.Content>
             <Message.Header>{errors.action}</Message.Header>
             {errors.message}
         </Message.Content>
        </Message>
      </Segment>
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

    const userCardItems = users.map(user => ( <UserCard key={user._id} user={user} deleteUser={deleteUser} /> ));
    const userCards = (
      <Card.Group>
        {userCardItems}
      </Card.Group>
    )

    return (
      <div>
        { loading && fetchingMessage }
        {/* { errors.action && errorMessage } */}
        { errorModal }
        { userCards }
      </div>
    )
  }
}

export default UsersList;
