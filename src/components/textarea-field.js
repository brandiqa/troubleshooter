import React from 'react';
import { observer } from 'mobx-react';
import { Form, TextArea } from 'semantic-ui-react';
import classnames from 'classnames';

export default observer(({field}) => (
  <Form.Field className={classnames({error:field.error})}>
    <label htmlFor={field.id}>
      {field.label}
    </label>
    <TextArea autoHeight {...field.bind()}/>
    {/* <textara {...field.bind()} /> */}
    <span className="error">{field.error}</span>
  </Form.Field>
));
