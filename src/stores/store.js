import { observable, action } from 'mobx';
import _ from 'lodash';
import { feathersClient } from './client';

class Store {

  let service = null;

  constructor(serviceName) {
    this.service = feathersClient().service(serviceName);
  }

  @observable errors = {};
  @observable entity = {};
  @observable entities = [];
  @observable loading = false;
  @observable redirect = false;

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
  fetchEntities = () => {
    this.loading = true;
    this.errors = {};
    this.service.find({})
      .then(response => this.entities = response.data )
      .catch(err => this.handleFeathersError(err))
      .then(() => this.loading = false);
  }

  @action
  createEntity = (entity) => {
    this.loading = true;
    this.errors = {};
    this.service.create(entity)
      .then(response => {
        this.entities.push(response)
        this.redirect = true;
      })
      .catch(err => this.handleFeathersError(err))
      .then(() => {
        this.loading = false;
        this.redirect = false;
      })
  }

  @action
  newEntity = () => {
    this.entity = {};
    this.errors = {};
  }

  @action
  fetchEntity = (_id) => {
    this.loading = true;
    this.errors = {}
    this.service.get(_id)
      .then(response => this.entity = response)
      .catch(err => this.handleFeathersError(err))
      .then(() => this.loading = false)
  }

  @action
  updateEntity = (_id, entity) => {
    this.loading = true;
    this.errors = {};
    this.service.patch(_id, entity)
      .then(response => {
        this.entities = this.entities.map(item => item._id === entity._id ? entity : item);
        this.redirect = true;
      })
      .catch(err => this.handleFeathersError(err))
      .then(() => {
        this.loading = false;
        this.redirect = false;
      })
  }

  @action
  deleteEntity = (_id) => {
    this.service.remove(_id)
      .then(response => {
        this.entities = this.entities.filter(item => item._id !== _id)
      })
      .catch(err => this.handleFeathersError(err))
  }
}

export default Store;
