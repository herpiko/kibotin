import React from 'react';
import * as PropTypes from 'prop-types';

export const Result = (props) => {
  const {
    outputId
  } = props;
  return (
    <img
      alt={"output"}
      style={{ width: "100%" }}
      src={
        "/outputs/output_" +
        outputId +
        "_switch.svg"
      }
    />
  )
};

Result.propTypes = {
  outputId: PropTypes.string
};
