import React from 'react';
import {EuiFormRow, EuiLink, EuiSelect, EuiText} from '@elastic/eui';
import {STAB_TYPE} from '../constants/STAB_TYPE';
import PropTypes from 'prop-types'

const stabOptions = Object.keys(STAB_TYPE).map(type => STAB_TYPE[type]);

export const StabCutoutSelector = (props) => {
  const {
    stabType,
    onChange
  } = props;
  return (
    <EuiFormRow
      label="Stabilizer type"
      labelAppend={
        <EuiText size="xs">
          <EuiLink href="http://builder-docs.swillkb.com/features/#stabilizer-type">
            Help
          </EuiLink>
        </EuiText>
      }
    >
      <EuiSelect
        name="stabType"
        options={stabOptions}
        value={stabType}
        onChange={(event) => onChange(parseInt(event.target.value, 10))}
      />
    </EuiFormRow>
  )
};

StabCutoutSelector.propTypes = {
  stabType: PropTypes.number,
  onChange: PropTypes.func
}
