import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {EuiFieldText, EuiFormRow, EuiSwitch} from '@elastic/eui';

export const KerfInput = (props) => {
  const [useKerf, setUseKerf] = useState(false);

  const {
    onChange
  } = props;

  useEffect(() => {
    if (!useKerf) {
      onChange(null)
    }
  }, [useKerf, onChange]);

  return (
    <React.Fragment>
      <EuiFormRow
        label="Kerf"
        helpText="Use dot as decimal separator"
      >
        <EuiSwitch
          label="Set kerf value"
          name="useKerf"
          checked={useKerf}
          onChange={() => setUseKerf(!useKerf)}
        />
      </EuiFormRow>
      {useKerf && (
        <EuiFormRow>
          <EuiFieldText
            style={{marginTop: 5}}
            name="kerf"
            type="number"
            placeholder="Kerf value in millimeter"
            onChange={event => onChange(parseFloat(event.target.value))}
          />
        </EuiFormRow>
      )}
    </React.Fragment>
  )
};

KerfInput.propTypes = {
  onChange: PropTypes.func
};
