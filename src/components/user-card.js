import React, { Component } from 'react';
import { Card, Button, Icon,  Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class UserCard extends Component {
  state = { modalOpen : false }

  handleOpen = (e) => this.setState({modalOpen:true})

  handleClose = (e) => this.setState({modalOpen:false})

  handleDelete = (e) => {
    const { user, deleteUser } = this.props;
    deleteUser(user._id);
    this.setState({modalOpen:false});
  }

  render() {
    const { user } = this.props;

    const modal = (
      <Modal open={this.state.modalOpen}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>Are you sure you want to delete user {user.email}?</Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleDelete}>
            <Icon name='checkmark'/> Yes, Delete this user
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
            <Icon name='user outline'/> {user.firstName} {user.lastName}
          </Card.Header>
          <Card.Description>
            <p><Icon name='user'/><span className="card-label">Username</span> : {user.username}</p>
            <p><Icon name='mail outline'/><span className="card-label">Email</span> : {user.email}</p>
            <p><Icon name='users'/><span className="card-label">Role</span> :  {user.role}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Link to={`/users/edit/${user._id}`} className="ui basic button teal">Edit</Link>
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

UserCard.propTypes = {
  user: React.PropTypes.object.isRequired,
  deleteUser: React.PropTypes.func.isRequired
}

export default UserCard;
