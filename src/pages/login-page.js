import React, { Component } from 'react';
import { Segment, Image, Grid } from 'semantic-ui-react';
import LoginForm from '../components/login-form';
import logo from '../icon_logo.svg';

class LoginPage extends Component {

  banner = {
    height:"40vh",
    backgroundColor:"#35424d",
    paddingTop: "12vh"
  }

  render() {
    return (
      <div>
        <Segment style={this.banner}>
          <Image src={logo} size="large" alt="Troubleshooter" centered/>
        </Segment>
        <Grid centered verticalAlign="middle" columns={3} style={{height:"35vh"}} container>
          <Grid.Column>
            <LoginForm />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LoginPage;
