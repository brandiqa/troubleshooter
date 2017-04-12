import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { NavLink } from 'react-router-dom';
import { Sidebar, Segment, Menu, Image, Icon } from 'semantic-ui-react';
import logo from './logo-inverted.svg';
import icon from './icon.svg';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Sidebar.Pushable as={Segment} style={{height:"100vh"}}>
          <Sidebar as={Menu} width='thin' vertical visible>
            <Segment basic centered style={{height:"50px"}}></Segment>
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
              {this.props.children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default Dashboard;
