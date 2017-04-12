import { observable, action } from 'mobx';
import { client, service } from './client';

export default class AuthStore {

  userService = service('user');

  @observable users = [];
  @observable user = {};

  @action
  updateUser = (data = null) => {
    this.user = data || {};
    client.set('user', this.user);
  }

  @action
  login = ({username, password}) => {
    client.authenticate({ strategy: 'local', username, password })
      .then(response => client.passport.verifyJWT(response.accessToken))
      .then(data => this.setCookie(data))
      .then(payload => this.userService.get(payload.userId))
      .then(user => this.updateUser(user));
  }
}
