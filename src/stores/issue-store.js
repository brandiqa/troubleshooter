import { observable, action } from 'mobx';
import _ from 'lodash';
import { feathersClient } from './client';

const decodeFeathersErrors = (err) => {
  const json = JSON.stringify(err);
  const globalError = JSON.parse(json);
  const errs = globalError.errors;
  const { category, subject, content, urgency } = errs;
  return {
    global: globalError.message,
    category: category ? category.message: '',
    subject: subject ? subject.message : '',
    content: content ? content.message : '',
    urgency: urgency ? urgency.message : ''
  }
}

class IssueStore {

  @observable issues = [];
  @observable issue = {};
  @observable loading = false;
  @observable errors = {};
  @observable showErrors = false;
  @observable redirect = false;

  service = feathersClient().service('issue');

  @action
  fetchAll = () => {
    this.loading = true;
    this.errors = {};
    this.service.find({})
      .then(response => this.issues = response.data )
      .catch(err => this.errors = { global : err.message ? err.message : 'Backend server is Unreachable'})
      .then(() => this.loading = false);
  }

  @action
  fetch = (_id) => {
    this.loading = true;
    this.errors = {}
    this.service.get(_id)
      .then(response => this.issue = response)
      .catch(err => this.errors = {global: err.message})
      .then(() => this.loading = false)
  }

  @action
  new = () => {
    this.issue = {};
  }

  @action
  create = (data) => {
    this.loading = true;
    this.errors = {};
    this.service.create(data)
      .then(response => {
        this.issuers.push(response)
        this.redirect = true;
      })
      .catch(err => this.errors = decodeFeathersErrors(err))
      .then(() => {
        this.loading = false;
        this.redirect = false;
      })
  }

  @action
  update = (_id, data) => {
    this.loading = true;
    this.errors = {};
    this.service.patch(_id, data)
      .then(response => {
        this.issues = this.issues.map(item => item._id === data._id ? data : item);
        this.redirect = true;
      })
      .catch(err => this.errors = decodeFeathersErrors(err))
      .then(() => {
        this.loading = false;
        this.redirect = false;
      })
  }

  @action
  deleteOne = () => {
    this.service.remove(_id)
      .then(response => {
        this.issues = this.issues.filter(item => item._id !== _id)
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

export default new IssueStore()
