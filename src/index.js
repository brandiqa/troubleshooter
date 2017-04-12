import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';
import DashboardPage from './pages/dashboard-page';
import UsersPage from './pages/users-page';
import LoginPage from './pages/login-page';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const isAuthenticated  = true;

const app = (
  <App>
    <Route component={LoginPage} path="/" />
  </App>
);

const dashboard = (
  <Dashboard>
    <Route component={DashboardPage} exact path="/" />
    <Route component={UsersPage} path="/users" />
  </Dashboard>
);

ReactDOM.render(
  <Router>
    <div>
      { isAuthenticated ? dashboard : app }
    </div>
  </Router>,
  document.getElementById('root')
);
