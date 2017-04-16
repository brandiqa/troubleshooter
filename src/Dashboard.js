import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Sidebar, Segment, Menu, Image, Icon, Button } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard-page';
import UsersPage from './pages/users-page';
import TicketPage from './pages/ticket-page';
import authStore from './stores/auth-store';
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
            <NavLink className="item" activeClassName="active" exact to="/tickets">
              <Icon name='users' /> Tickets
            </NavLink>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic padded style={{width:"92vw"}}>
              <Menu secondary>
                <Menu.Header><Image src={logo} size="small"/></Menu.Header>
                <Menu.Menu position="right">
                  <Menu.Item>
                    Logged in as {authStore.fullName}
                  </Menu.Item>
                  <Menu.Item>
                    <Button basic onClick={() => authStore.logout()}>Logout</Button>
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
              <hr/>
              <Route component={DashboardPage} exact path="/" />
              <Route component={UsersPage} path="/users" />
              <Route component={TicketPage} path="/tickets" />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default Dashboard;
