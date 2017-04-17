import React, { Component } from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import { NavLink, Route } from 'react-router-dom';
import TicketList from '../components/ticket-list.js';
import TicketDetail from '../components/ticket-detail.js';

class TicketPage extends Component {
  render() {
    return(
      <div>
        <Menu>
          <NavLink className="item" activeClassName="active" exact to="/tickets">List Tickets</NavLink>
          <Menu.Item>
            Submit Ticket
          </Menu.Item>
        </Menu>
        <Grid columns={12}>
          <Grid.Column>
             <Route component={TicketList} path="/tickets"/>
          </Grid.Column>
          <Grid.Column>
            <TicketDetail/>
            <Route component={TicketDetail} path="/tickets/:id"/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default TicketPage;
