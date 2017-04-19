import React from 'react';
import { observer } from 'mobx-react';
import { Form } from 'semantic-ui-react';
import classnames from 'classnames';

export default observer(({field}) => (
  <Form.Field className={classnames({error:field.error})}>
    <label htmlFor={field.id}>
      {field.label}
    </label>
    <select {...field.bind()}>
      {field.options.map(option => (<option key={option.key} value={option.value}>{option.text}</option>) )}
    </select>
    <span className="error">{field.error}</span>
  </Form.Field>
));
