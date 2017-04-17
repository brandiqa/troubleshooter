import React, { Component } from 'react';
import { observer } from 'mobx-react';
import IssueForm from '../components/issue-form';
import store from '../stores/issue-store';

@observer
class IssueFormContainer extends Component {

  componentDidMount() {
    const { _id } = this.props.match.params;
    if(_id){
      store.fetch(_id)
    } else {
      store.new();
    }
  }

  render() {
    const { _id } = this.props.match.params;
    return (
      <div>
        <IssueForm issue={store.issue} _id={_id}/>
      </div>
    )
  }
}

export default IssueFormContainer;
