import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react'
import _ from 'lodash';
import moment from 'moment';

class BacklogCard extends Component {

  handleSubmitTicket = () => {
    const { issue, submitTicket } =  this.props;
    let value = issue;
    delete issue.user;
    const values = { issues: [value] };
    submitTicket(values);
  }

  handleMergeTicket = () => {
    console.log('merge');
  }

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
            <p><Icon name='circle outline'/><span className="card-label">Status</span> :  {_.capitalize(issue.status)}</p>
            <p><Icon name='user'/><span className="card-label">Posted By</span> :  {issue.user.email}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group>
            <Button color="green" onClick={this.handleSubmitTicket} disabled={issue.ticketId}>Submit Ticket</Button>
            <Button color="teal" onClick={this.handleMergeTicket} disabled={issue.ticketId}>Merge Ticket</Button>
          </Button.Group>
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
