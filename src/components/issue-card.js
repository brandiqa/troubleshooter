import React, { Component } from 'react';
import { Card, Button, Icon,  Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';

class IssueCard extends Component {

  state = { modalOpen : false }

  handleOpen = (e) => this.setState({modalOpen:true})

  handleClose = (e) => this.setState({modalOpen:false})

  handleDelete = (e) => {
    const { issue, deleteIssue } = this.props;
    deleteIssue(issue._id);
    this.setState({modalOpen:false});
  }

  render() {
    const { issue } = this.props;

    const modal = (
      <Modal open={this.state.modalOpen}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>Are you sure you want to delete this issue?</Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleDelete}>
            <Icon name='checkmark'/> Yes, Delete this issue
          </Button>
          <Button onClick={this.handleClose}>
            <Icon name='remove'/> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )

    const card = (
      <Card>
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
            <Link to={`/issues/edit/${issue._id}`} className="ui basic button teal">Edit</Link>
            <Button basic color="red" onClick={this.handleOpen}>Delete</Button>
          </div>
        </Card.Content>
      </Card>
    )

    return (
      <div>
        { modal }
        { card }
      </div>
    )
  }
}

IssueCard.propTypes = {
  issue: React.PropTypes.object.isRequired,
  deleteIssue: React.PropTypes.func.isRequired
}

export default IssueCard;
