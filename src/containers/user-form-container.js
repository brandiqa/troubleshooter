import React, { Component } from 'react';
import { observer } from 'mobx-react';
import UserForm from '../components/user-form';
import store from '../stores/users-store';

@observer
class UserFormContainer extends Component {

  componentDidMount() {
    const { _id } = this.props.match.params;
    if(_id){
      store.fetchUser(_id)
    } else {
      store.newUser();
    }
  }

  render() {
    const { _id } = this.props.match.params;
    return (
      <div>
        <UserForm user={store.user} _id={_id}/>
      </div>
    )
  }
}

export default UserFormContainer;
