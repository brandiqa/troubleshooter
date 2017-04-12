import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { Sidebar, Segment, Menu, Image, Icon } from 'semantic-ui-react';
import logo from './logo-inverted.svg';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <DevTools/>
        <Sidebar.Pushable as={Segment} style={{height:"100vh"}}>
          <Sidebar as={Menu} width='thin' vertical  visible>
            <Image src={logo} />
            <Menu.Item name='dashboard'>
              <Icon name='home' />
              Dashboard
            </Menu.Item>
            <Menu.Item name='users'>
              <Icon name='users' />
              Users
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <h1>My Dashboard</h1>
              <hr/>
              {this.props.children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default Dashboard;
