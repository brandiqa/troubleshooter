import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function UserCard({user, deleteUser}) {
  return (
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
          <Button basic color="red" onClick={() => deleteUser(user._id)} >Delete</Button>
        </div>
      </Card.Content>
    </Card>
  )
}

UserCard.propTypes = {
  user: React.PropTypes.object.isRequired,
  // deleteUser: React.PropTypes.func.isRequired
}
