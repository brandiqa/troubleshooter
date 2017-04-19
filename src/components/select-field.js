import React from 'react';
import { observer } from 'mobx-react';
import { Form, Select } from 'semantic-ui-react';
import classnames from 'classnames';

export default observer(({field}) => (
  <Form.Field className={classnames({error:field.error})}>
    <label htmlFor={field.id}>
      {field.label}
    </label>
     <Select options={field.options} {...field.bind()}/>
    <span className="error">{field.error}</span>
  </Form.Field>
));
