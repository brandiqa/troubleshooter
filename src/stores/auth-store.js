import { observable, action, computed } from 'mobx';
import _ from 'lodash';
import { feathersClient, service } from './client';

class AuthStore {

  @observable users = [];
  @observable user = {};
  @observable errors = {}

  client = feathersClient();
  userService = service('user');

  @action
  sessionAuth = () => {
    this.client.authenticate()
      .then(response => this.client.passport.verifyJWT(response.accessToken))
      .then(data => this.userService.get(data.userId))
      .then(user => this.user = user)
      .catch(err => console.info('no valid session found'))
  }

  @action
  login = ({email, password}) => {
    this.errors = {};
    this.client.authenticate({ strategy: 'local', email, password })
    .then(response => this.client.passport.verifyJWT(response.accessToken))
    .then(data => this.userService.get(data.userId))
    .then(user => this.user = user)
    .catch(err => this.errors = {global: 'Invalid email/password'});
  }

  @computed get isAuthenticated() {
    return !_.isEmpty(this.user);
  }
}

export default new AuthStore();
