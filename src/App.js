import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { BrowserRouter} from 'react-router-dom';
import { Segment, Container } from 'semantic-ui-react';
import authStore from './stores/auth-store';
import Dashboard from './Dashboard';
import LoginPage from './pages/login-page';

@observer
class App extends Component {

  constructor(props) {
    super(props);
    authStore.sessionAuth();
  }

  appLoading = (
    <Container>
      <Segment padded basic color="teal" textAlign="center">
        <h3>Application is loading...</h3>
        <Segment basic loading style={{marginTop:"20vh"}}>
          <p>Please wait</p>
        </Segment>
      </Segment>
    </Container>
  );

  login = (
    <Route component={LoginPage} path="/" />
  );


  render() {
    const app = (
      <div>
        { authStore.isAuthenticated ? <Dashboard /> : this.login }
      </div>
    );
    return (
      <BrowserRouter>
        { authStore.authPending ? this.appLoading : app }
      </BrowserRouter>
    );
  }
}

export default App;
