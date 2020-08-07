import React from 'react';
import {EuiFieldText, EuiFormRow} from '@elastic/eui';
import * as PropTypes from 'prop-types';

export const CornerRadius = (props) => {
  const {
    onChange
  } = props;
  return (
    <React.Fragment>
      <EuiFormRow
        label="Corner Radius"
      >
        <EuiFieldText
          style={{marginTop: 5}}
          name="mount-holes"
          type="text"
          placeholder="Corner Radius / Edges Radius in mm"
          onChange={event => onChange(parseInt(event.target.value, 10))}
        />
      </EuiFormRow>
    </React.Fragment>
  )
};

CornerRadius.propTypes = {
  onChange: PropTypes.func
};
