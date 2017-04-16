import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import InputField from './input-field';
import store from '../stores/users-store';

const editFields = {
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
  role: {
    name: 'role',
    label: 'Role',
    placeholder: 'admin|agent|user',
    type: 'text',
    rules: 'string|required'
  }
}

const password = {
  name: 'password',
  label: 'Password',
  placeholder: 'Password',
  type: 'password',
  rules:'string|required'
}

class MobxForm extends MobxReactForm {
  onSuccess(form) {
    if(store.user._id){
      store.updateUser(form.values())
    }
    else {
      store.createUser(form.values())
    }
  }
}

@observer
class UserForm extends Component {

  form = null;
  state = { enablePassword: false};

  componentWillMount() {
    let fields = null;
    const plugins = { dvr: validatorjs };
    const { _id } = this.props;
    if(_id){
      fields = editFields;
    } else {
      fields = { ...editFields, password }
    }
    this.form = new MobxForm({fields},{plugins});
    this.setState({ enablePassword: fields.password != null })
  }


  componentWillReceiveProps = (nextProps) => {
    const user = nextProps.user;
    this.form.update(user);
  }

  render() {
    const form = this.form;
    const { enablePassword } = this.state;
    const { redirect, loading, errors, user } = store;

    const userForm = (
      <Form onSubmit={form.onSubmit} loading={loading}>
        <Form.Group widths='equal'>
          <InputField field={form.$('firstName')} error={errors.firstName} />
          <InputField field={form.$('lastName')} error={errors.lastName}/>
        </Form.Group>
        <InputField field={form.$('username')} error={errors.username} />
        <InputField field={form.$('email')} error={errors.email} />
        <InputField field={form.$('role')} error={errors.role} />
        {enablePassword && <InputField field={form.$('password')} error={errors.password}/>}
        <Button color="green" type='submit' disabled={form.isPristine}>Save</Button>
      </Form>
    );

    const grid = (
      <div>
        <Grid columns={3}>
          <Grid.Column>
            <h3 style={{marginTop:"1em"}}>{ user._id ? 'Edit User' : 'Add New User' }</h3>
            {errors.global && <Message negative> {errors.global} </Message>}
            { userForm }
          </Grid.Column>
        </Grid>
      </div>
    );

    return (
      <div>
        { redirect ? <Redirect to="/users" /> : grid }
      </div>
    )
  }
}

export default UserForm;
