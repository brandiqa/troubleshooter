import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import _ from 'lodash';
import authStore from './stores/auth-store';
import Dashboard from './Dashboard';
import LoginPage from './pages/login-page';

@observer
class App extends Component {

  login = (
    <Route component={LoginPage} path="/" />
  );

  render() {
    return (
      <div>
        { _.isEmpty(authStore.user) ? this.login : <Dashboard /> }
      </div>
    );
  }
}

export default App;
