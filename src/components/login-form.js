import React, { Component } from 'react';
import { Form, Button, Message, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import InputField from './input-field';
import authStore from '../stores/auth-store';

const fields = {
  username: {
    name: 'username',
    label: 'Username',
    placeholder: 'Username',
    rules:'string|required'
  },
  password: {
    name: 'password',
    label: 'password',
    placeholder: 'password',
    rules:'string|required'
  }
}

class MobxForm extends MobxReactForm {
  onSuccess(form) {
    authStore.login(form.values())
  }
}

@observer
class LoginForm extends Component {

  form = null;

  componentWillMount() {
    const plugins = { dvr: validatorjs };
    this.form = new MobxForm({fields},{plugins});
  }

  render() {
    const form = this.form;

    const errorMessage = (
      <Message icon negative>
        <Icon name='warning' />
        <Message.Content>
           <Message.Header>{authStore.errors.global}</Message.Header>
       </Message.Content>
      </Message>
    );

    return (
      <div>
        <h1>Login</h1>
        {authStore.errors.global && errorMessage}
        <Form onSubmit={form.onSubmit}>
          <InputField field={form.$('username')} />
          <InputField field={form.$('password')} />
          <Button primary>Sign In</Button>
        </Form>
      </div>
    );
  }
}

export default LoginForm
