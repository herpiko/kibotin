import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {EuiFieldText, EuiSwitch} from '@elastic/eui';

export const KerfInput = (props) => {
  const [useKerf, setUseKerf] = useState(false);
  const {
    onChange
  } = props;

  return (
    <div>
      <EuiSwitch
        label="Set kerf value"
        name="useKerf"
        checked={useKerf}
        onChange={() => setUseKerf(!useKerf)}
      />
      {useKerf && (
        <EuiFieldText
          style={{ marginTop: 5 }}
          name="kerf"
          type="number"
          placeholder="Kerf value in millimeter"
          onChange={event => onChange(parseFloat(event.target.value))}
        />
      )}
    </div>
  )
};

KerfInput.propTypes = {
  onChange: PropTypes.func
};
