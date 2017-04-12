import { observable, action } from 'mobx';
import { service } from './client';

export class AuthStore {

  userService = service('users');

  @observable users = [];
  @observable user = {};

}
