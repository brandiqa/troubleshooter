import { observable, action } from 'mobx';
import { feathersClient, service } from './client';
import cookie from 'js-cookie';

class AuthStore {

  @observable users = [];
  @observable user = {};
  @observable errors = {}

  client = feathersClient();
  userService = service('user');
  cookieName = 'ssrToken';
  jwt = null;

  setCookie(data) {
    this.jwt = data;
    cookie.set(this.cookieName, data);
    return data;
  }

  @action
  updateUser = (data = null) => {
    this.user = data || {};
    this.client.set('user', this.user);
  }

  @action
  login = ({email, password}) => {
    this.client.authenticate({ strategy: 'local', email, password })
      .then(response => this.client.passport.verifyJWT(response.accessToken))
      .then(data => this.setCookie(data))
      .then(data => this.userService.get(data.userId))
      .then(user => this.updateUser(user))
      .catch(error => {
        console.log("error authenticating", error);
        this.errors = {global : error.message};
      });
  }
}

export default new AuthStore();
