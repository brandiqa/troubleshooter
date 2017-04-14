import React, { Component } from 'react';
import authStore from '../stores/auth-store';
import UsersList from '../components/users-list';

class UsersPage extends Component {
  render() {
    return (
     <div>
       <h2>List of Users</h2>
       <UsersList store={authStore}/>
     </div>
    )
  }
}

export default UsersPage;
