import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Message, Icon, Card } from 'semantic-ui-react';
import UserCard from './user-card';
import store from '../stores/users-store';

@observer
class UsersList extends Component {

  componentDidMount() {
    store.fetchUsers();
  }

  render() {
    const { users, loading, errors, deleteUser } = store;

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
      <Message icon negative>
        <Icon name='wait' />
        <Message.Content>
           <Message.Header>Server Timeout</Message.Header>
           {errors.global}
       </Message.Content>
      </Message>
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
        { errors.global && errorMessage }
        { userCards }
      </div>
    )
  }
}

export default UsersList;
