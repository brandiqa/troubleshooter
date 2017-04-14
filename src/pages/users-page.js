import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import UsersList from '../components/users-list';
import UserFormContainer from '../containers/user-form-container';

class UsersPage extends Component {
  render() {
    return (
     <div>
       <div className="ui menu basic teal">
          <NavLink className="item" activeClassName="active" exact to="/users">Users List</NavLink>
          <NavLink className="item" activeClassName="active" exact to="/users/new">Add User</NavLink>
        </div>
       <h2>User Administration</h2>
       <Route component={UsersList} exact path="/users"/>
       <Route component={UserFormContainer} path="/users/new"/>
       <Route component={UserFormContainer} path="/users/edit/:_id" />
     </div>
    )
  }
}

export default UsersPage;
