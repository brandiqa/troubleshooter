import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import { Icon, Form, Button, Grid, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import InputField from './input-field';
import store from '../stores/auth-store';

const fields = {
  firstName: {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'First Name',
    type: 'text',
    rules:'string|required'
  },
  lastName: {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Last Name',
    type: 'text',
    rules:'string'
  },
  username: {
    name: 'username',
    label: 'Username',
    placeholder: 'Username',
    type: 'text',
    rules:'string|required'
  },
  email: {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    type: 'email',
    rules:'email|string|required'
  },
  password: {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    rules:'string|required'
  }
}

class MobxForm extends MobxReactForm {
  onSuccess(form) {
    store.createUser(form.values())
  }
}

@observer
class UserForm extends Component {

  form = null;

  componentWillMount() {
    const plugins = { dvr: validatorjs };
    this.form = new MobxForm({fields},{plugins});
  }

  componentWillReceiveProps = (nextProps) => {
    const user = nextProps.user;
    this.form.update(user);
  }

  render() {
    const form = this.form;
    const { redirect, loading, errors, user } = store;

    const errorMessage = (
      <Message icon negative>
        <Icon name='warning' />
        <Message.Content>
           <Message.Header>Something went wrong!</Message.Header>
           {errors.global}
       </Message.Content>
      </Message>
    );

    const formComponent = (
      <Form onSubmit={form.onSubmit} loading={loading}>
        <Form.Group widths='equal'>
          <InputField field={form.$('firstName')} error={errors.firstName} />
          <InputField field={form.$('lastName')} error={errors.lastName}/>
        </Form.Group>
        <InputField field={form.$('username')} error={errors.username} />
        <InputField field={form.$('email')} error={errors.email} />
        <InputField field={form.$('password')} error={errors.password} />
        <Button color="teal" type='submit' disabled={form.isPristine}>Save</Button>
      </Form>
    );

    const grid = (
      <div>
        <Grid columns={3}>
          <Grid.Column>
            <h3 style={{marginTop:"1em"}}>{ user._id ? 'Edit User' : 'Add New User' }</h3>
            {errors.global && errorMessage }
            {formComponent}
          </Grid.Column>
        </Grid>
      </div>
    );

    return (
      <div>
        { redirect ? <Redirect to="/" /> : grid }
      </div>
    )
  }
}

export default UserForm;
