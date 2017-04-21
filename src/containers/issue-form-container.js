import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import IssueForm from '../components/issue-form';
import authStore from '../stores/auth-store';
import createStore from '../stores/store';
import { categoryOptions, priorityOptions } from '../config/options';

const store = createStore('issues');

const fields = {
  category: {
    name:'category',
    label: 'Category',
    placeholder: 'Choose Category',
    type: 'select',
    options: categoryOptions,
    rules: 'string|required'
  },
  subject: {
    name: 'subject',
    label: 'Subject',
    placeholder: 'Subject',
    type: 'text',
    rules: 'string|required'
  },
  content: {
    name: 'content',
    label: 'Content',
    placeholder: 'Describe the issue',
    type: 'textarea',
    rows: 3,
    rules: 'string|required'
  },
  urgency: {
    name: 'urgency',
    label: 'Priority',
    placeholder: 'Choose a Priority level',
    type: 'select',
    options: priorityOptions,
    rules: 'string|required'
  }
}

class Form extends MobxReactForm {
  onSuccess(form) {
    if(store.entity._id){
      store.update(store.entity._id, form.values())
    }
    else {
      const issue = Object.assign(form.values(),{postedBy:authStore.user})
      store.create(issue)
    }
  }
}

@observer
class IssueFormContainer extends Component {

  form = null;

  constructor(props){
    super(props)
    const plugins = { dvr: validatorjs };
    this.form = new Form({fields},{plugins});
  }

  componentDidMount() {
    const { _id } = this.props.match.params;
    if(_id){
      store.fetch(_id)
    } else {
      store.newEntity();
    }
  }

  render() {
    return (
      <div>
        <IssueForm store={store} form={this.form} issue={store.entity}/>
      </div>
    )
  }
}

export default IssueFormContainer;
