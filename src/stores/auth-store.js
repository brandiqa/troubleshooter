import { observable, action } from 'mobx';
import { feathersClient, service } from './client';

class AuthStore {

  @observable users = [];
  @observable user = {};
  @observable errors = {}

  client = feathersClient();
  userService = service('user');

  @action
  updateUser = (data = null) => {
    this.user = data || {};
    this.client.set('user', this.user);
  }

  @action
  login = ({username, password}) => {
    this.client.authenticate({ strategy: 'local', username, password })
      .then(response => this.client.passport.verifyJWT(response.accessToken))
      .then(data => this.setCookie(data))
      .then(payload => this.userService.get(payload.userId))
      .then(user => this.updateUser(user))
      .catch(error => {
        console.log("error authenticating", error);
        this.errors = {global : error.message};
      });
  }
}

export default new AuthStore();
