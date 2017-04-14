import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Message, Icon } from 'semantic-ui-react';

@observer
class UsersList extends Component {

  componentDidMount() {
    this.props.store.fetchUsers();
  }

  render() {
    const { users, loading, errors } = this.props.store;

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

    const userItems = users.map(user => ( <li key={user._id}>{user.email}</li> ));
    const usersList = (
      <ul>
        {userItems}
      </ul>
    )

    return (
      <div>
        { loading && fetchingMessage }
        { errors.global && errorMessage }
        { usersList }
      </div>
    )
  }
}

export default UsersList;
