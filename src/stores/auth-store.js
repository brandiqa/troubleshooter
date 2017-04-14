import { observable, action, computed } from 'mobx';
import _ from 'lodash';
import { feathersClient, service } from './client';

class AuthStore {

  @observable users = [];
  @observable user = {};
  @observable loading = false;
  @observable errors = {}

  client = feathersClient();
  userService = service('user');

  @action
  sessionAuth = () => {
    this.loading = true;
    this.client.authenticate()
      .then(response => this.client.passport.verifyJWT(response.accessToken))
      .then(data => this.userService.get(data.userId))
      .then(user => this.user = user)
      .catch(err => console.info('no valid session found'))
      .then(() => this.loading = false)
  }

  @action
  login = ({email, password}) => {
    this.errors = {};
    this.loading = true;
    this.client.authenticate({ strategy: 'local', email, password })
    .then(response => this.client.passport.verifyJWT(response.accessToken))
    .then(data => this.userService.get(data.userId))
    .then(user => this.user = user)
    .catch(err => this.errors = {global: 'Invalid email/password'})
    .then(() => this.loading = false);
  }

  @action
  logout = () => {
    this.client.logout()
      .then(() => this.user = {})
  }

  @computed get isAuthenticated() {
    return !_.isEmpty(this.user);
  }
}

export default new AuthStore();
