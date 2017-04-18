import { observable, action } from 'mobx';
import _ from 'lodash';
import { feathersClient, service } from './client';

class UserStore {

  @observable users = [];
  @observable user = {};
  @observable loading = false;
  @observable errors = {};
  @observable showErrors = false;
  @observable redirect = false;

  client = feathersClient();
  userService = service('user');

  handleFeathersError = (err) => {
    if( err.code === 400) {
      let messages = [];
      _.each(err.errors, (value, key) => {
        messages.push(value.message);
      })
      this.errors = {global: err.message, messages}
    } else {
      this.errors = {global: err.message}
    }
  }

  @action
  fetchUsers = () => {
    this.loading = true;
    this.errors = {};
    this.userService.find({})
      .then(response => this.users = response.data )
      .catch(err => this.handleFeathersError(err))
      .then(() => this.loading = false);
  }

  @action
  createUser = (user) => {
    this.loading = true;
    this.errors = {};
    this.userService.create(user)
      .then(response => {
        this.users.push(response)
        this.redirect = true;
      })
      .catch(err => this.handleFeathersError(err))
      .then(() => {
        this.loading = false;
        this.redirect = false;
      })
  }

  @action
  newUser = () => {
    this.user = {};
  }

  @action
  fetchUser = (_id) => {
    this.loading = true;
    this.errors = {}
    this.userService.get(_id)
      .then(response => this.user = response)
      .catch(err => this.handleFeathersError(err))
      .then(() => this.loading = false)
  }

  @action
  updateUser = (_id, user) => {
    this.loading = true;
    this.errors = {};
    this.userService.patch(_id, user)
      .then(response => {
        this.users = this.users.map(item => item._id === user._id ? user : item);
        this.redirect = true;
      })
      .catch(err => this.handleFeathersError(err))
      .then(() => {
        this.loading = false;
        this.redirect = false;
      })
  }

  @action
  deleteUser = (_id) => {
    this.userService.remove(_id)
      .then(response => {
        this.users = this.users.filter(item => item._id !== _id)
      })
      .catch(err =>  {
        this.errors = {action:'Delete User Denied!', message: err.message}
        this.showErrors = true;
      })
  }

  @action
  hideErrors = () => {
    this.showErrors = false;
  }
}

export default new UserStore();
