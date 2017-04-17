import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import InputField from './input-field';
import store from '../stores/issue-store';
import { user } from '../stores/auth-store';

const fields = {
  category: {
    name:'category',
    label: 'Category',
    placeholder: 'Choose Category',
    type: 'select',
    values: ['Hardware', 'Software'],
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
    type: 'text',
    rules: 'string|required'
  },
  urgency: {
    name: 'urgency',
    label: 'urgency',
    placeholder: 'urgency',
    type: 'text',
    rules: 'string|required'
  }
}


class MobxForm extends MobxReactForm {
  onSuccess(form) {
    if(store.issue._id){
      store.update(store.issue._id, form.values())
    }
    else {
      const issue = Object.assign(form.values(),{postedBy:user})
      store.create(issue)
    }
  }
}

@observer
class IssueForm extends Component {

    form = null;

    componentWillMount() {
      const plugins = { dvr: validatorjs };
      this.form = new MobxForm({fields},{plugins});
    }


    componentWillReceiveProps = (nextProps) => {
      const issue = nextProps.issue;
      this.form.update(issue);
    }

    render() {
      const form = this.form;
      const { redirect, loading, errors, issue } = store;

      const issueForm = (
        <Form onSubmit={form.onSubmit} loading={loading}>
          <InputField field={form.$('category')} error={errors.category} />
          <InputField field={form.$('subject')} error={errors.subject}/>
          <InputField field={form.$('content')} error={errors.content} />
          <InputField field={form.$('urgency')} error={errors.urgency} />
          <Button color="green" type='submit' disabled={form.isPristine}>Report Issue</Button>
        </Form>
      );

      const grid = (
        <div>
          <Grid columns={3}>
            <Grid.Column>
              <h3 style={{marginTop:"1em"}}>{ issue._id ? 'Edit Issue' : 'Report New Issue' }</h3>
              {errors.global && <Message negative> {errors.global} </Message>}
              { issueForm }
            </Grid.Column>
          </Grid>
        </div>
      );

      return (
        <div>
          { redirect ? <Redirect to="/issues" /> : grid }
        </div>
      )
    }
}

export default IssueForm;
