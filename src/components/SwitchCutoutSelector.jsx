import React from 'react';
import * as PropTypes from 'prop-types';
import {SWITCH_TYPE} from '../constants/SWITCH_TYPE';

const SWITCH_PLACEHOLDER = [
  require('../assets/switch_type_classic.png'),
  require('../assets/switch_type_mx_alps.png'),
  require('../assets/switch_type_mx.png'),
  require('../assets/switch_type_alps.png')
];

const switchOptions = Object.keys(SWITCH_TYPE).map((type) => SWITCH_TYPE[type]);

export const SwitchCutoutSelector = (props) => {
  const {
    switchType,
    onChange
  } = props;

  return (
    <div>
      {switchOptions
        .map((option, index) => (
          <div style={{ display: "inline-block", margin: 5 }} key={index}>
            <img
              alt={"switch type " + option.text}
              className={
                switchType === option.value
                  ? "selection selected"
                  : "selection"
              }
              src={SWITCH_PLACEHOLDER[index]}
              onClick={() => {
                onChange(option.value)
              }}
              width="60"
            />
            <p style={{ fontSize: 10 }}>{option.text}</p>
          </div>
        ))
      }
    </div>
  )
};

SwitchCutoutSelector.propTypes = {
  switchType: PropTypes.number,
  onChange: PropTypes.func
};
