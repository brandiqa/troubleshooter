import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import _ from 'lodash';
import authStore from './stores/auth-store';
import Dashboard from './Dashboard';
import LoginPage from './pages/login-page';
import { BrowserRouter} from 'react-router-dom';

@observer
class App extends Component {


  login = (
    <Route component={LoginPage} path="/" />
  );

  render() {
    const isAuthenticated = !_.isEmpty(authStore.user);
    return (
      <BrowserRouter>
          {isAuthenticated ? <Dashboard /> : this.login }
      </BrowserRouter>
    );
  }
}

export default App;
