import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import InputField from './input-field';
import SelectField from './select-field';

@observer
class IssueForm extends Component {

    componentWillReceiveProps = (nextProps) => {
      const issue = nextProps.issue;
      this.props.form.update(issue);
    }

    render() {
      const { form } = this.props;
      const { redirect, loading, errors, entity:issue } = this.props.store;

      const issueForm = (
        <Form onSubmit={form.onSubmit} loading={loading}>
          <SelectField field={form.$('category')}  />
          <InputField field={form.$('subject')} />
          <InputField field={form.$('content')}  />
          <InputField field={form.$('urgency')}  />
          <Button color="green" type='submit' disabled={form.isPristine}>Submit Issue</Button>
        </Form>
      );

      const grid = (
        <div>
          <Grid columns={3}>
            <Grid.Column>
              <h3 style={{marginTop:"1em"}}>{ issue._id ? 'Update an Issue' : 'Report an Issue' }</h3>
              {errors.global && <Message negative> {errors.global} </Message>}
              { issueForm }
            </Grid.Column>
          </Grid>
        </div>
      );

      return (
        <div>
          { redirect ? <Redirect to="/issues" /> : grid }
        </div>
      )
    }
}

export default IssueForm;
