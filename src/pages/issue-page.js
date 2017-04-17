import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import IssueList from '../components/issues-list';
import IssueFormContainer from '../containers/issue-form-container';

class IssuePage extends Component {
  render() {
    return (
     <div>
       <div className="ui menu basic teal">
          <NavLink className="item" activeClassName="active" exact to="/issues">List Issues</NavLink>
          <NavLink className="item" activeClassName="active" exact to="/issues/new">Report Issue</NavLink>
        </div>
       <h2>My Issues</h2>
       <Route component={IssueList} exact path="/issues"/>
       <Route component={IssueFormContainer} path="/issues/new"/>
       <Route component={IssueFormContainer} path="/issues/edit/:_id" />
     </div>
    )
  }
}

export default IssuePage;
