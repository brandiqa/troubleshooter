import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { NavLink } from 'react-router-dom';
import { Sidebar, Segment, Menu, Image, Icon } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard-page';
import UsersPage from './pages/users-page';
import logo from './logo-inverted.svg';
import icon from './icon.svg';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Sidebar.Pushable as={Segment} style={{height:"100vh"}}>
          <Sidebar as={Menu} width='thin' vertical visible inverted>
            <Segment basic inverted style={{ height: "80px", marginBottom:0}}>
              <Image src={icon} size="small" centered style={{width:"50px"}}/>
            </Segment>
            <NavLink className="item" activeClassName="active" exact to="/">
              <Icon name='home' /> Dashboard
            </NavLink>
            <NavLink className="item" activeClassName="active" exact to="/users">
              <Icon name='users' /> Users
            </NavLink>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Image src={logo} size="small"/>
              <hr/>
              <DevTools/>
              <Route component={DashboardPage} exact path="/" />
              <Route component={UsersPage} path="/users" />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default Dashboard;
