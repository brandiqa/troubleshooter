import React, { Component } from 'react';
import { Card, Button, Icon,  Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';

class BacklogCard extends Component {

  render() {
    const { issue } = this.props;
    const color = () => {
      if(issue.urgency === 'high') {
        return 'red';
      } else if( issue.urgency === 'medium') {
        return 'yellow';
      } else {
        return 'teal';
      }
    }
    const card = (
      <Card color={color()}>
        <Card.Content>
          <Card.Header>
            <Icon name='book'/> {issue.subject}
          </Card.Header>
          <Card.Description>
            <p><Icon name='calendar'/><span className="card-label">Posted on</span> : {moment(issue.createdAt).format('DD-MM-YYYY h:mm a')}</p>
            <p><Icon name='desktop'/><span className="card-label">Category</span> : {_.capitalize(issue.category)}</p>
            <p><Icon name='alarm'/><span className="card-label">Urgency</span> :  {_.capitalize(issue.urgency)}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button color="green">New Ticket</Button>
            <Button color="teal">Assign Ticket</Button>
          </div>
        </Card.Content>
      </Card>
    )

    return (
      <div>
        { card }
      </div>
    )
  }
}

export default BacklogCard;
