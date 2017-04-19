import React, { Component } from 'react';
import { observer } from 'mobx-react';
import IssueForm from '../components/issue-form';
import Store from '../stores/store';

@observer
class IssueFormContainer extends Component {

  store = null;

  constructor(props) {
    super(props)
    this.store = new Store('issues');
  }

  componentDidMount() {
    const { _id } = this.props.match.params;
    if(_id){
      this.store.fetch(_id)
    } else {
      this.store.newEntity();
    }
  }

  render() {
    const { _id } = this.props.match.params;
    return (
      <div>
        <IssueForm store={this.store} issue={this.store.entity} _id={_id}/>
      </div>
    )
  }
}

export default IssueFormContainer;
