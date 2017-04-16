import { observable, action } from 'mobx';
import _ from 'lodash';
import { feathersClient, service } from './client';

const decodeFeathersErrors = (err) => {
  const json = JSON.stringify(err);
  const errs = JSON.parse(json).errors;
  const { firstName, lastName, username, email, password, role } = errs;
  return {
    global: 'User Validation Failed at Server Level!',
    firstName: firstName ? firstName.message: '',
    lastName: lastName ? lastName.message : '',
    username: username ? username.message : '',
    email: email ? email.message : '',
    password: password ? password.message : '',
    role: role ? role.message : ''
  }
}

class UserStore {

  @observable users = [];
  @observable user = {};
  @observable loading = false;
  @observable errors = {};
  @observable redirect = false;

  client = feathersClient();
  userService = service('user');

  @action
  fetchUsers = () => {
    this.loading = true;
    this.errors = {};
    this.userService.find({})
      .then(response => this.users = response.data )
      .catch(err => this.errors = { global : err.message ? err.message : 'Backend server is Unreachable'})
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
      .catch(err => this.errors = decodeFeathersErrors(err))
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
      .catch(err => this.errors = {global: err.message})
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
      .catch(err => this.errors = decodeFeathersErrors(err))
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
      .catch(err =>  this.errors = {global: "Something went wrong"} )
  }
}

export default new UserStore();
