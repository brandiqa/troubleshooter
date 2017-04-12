import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class LoginForm extends Component {

  render() {
    const form = (
      <div>
        <h1>Login</h1>
        <Form>
            <Form.Input label='Username' type="text" />
            <Form.Input label='Password' type="password" />
            <Button primary>SIGN IN</Button>
        </Form>
      </div>
    );

    return (
      <div>
        {form}
      </div>
    );
  }
}

export default LoginForm
