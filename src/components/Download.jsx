import React from 'react';
import * as PropTypes from 'prop-types'
import {EuiButton} from '@elastic/eui';
import download from 'downloadjs';
import {SUPPORTED_DOWNLOAD} from '../constants/SUPPORTED_DOWNLOAD';

export const Download = (props) => {
  const {
    outputId
  } = props;

  return (
    <div>
      {SUPPORTED_DOWNLOAD.map(fileType => (
        <EuiButton
          key={fileType}
          style={{margin: 10}}
          fill
          onClick={() => {
            download(
              '/outputs/output_' +
              outputId +
              '_switch.' + fileType
            );
          }}
        >
          {fileType.toUpperCase()}
        </EuiButton>
      ))}
    </div>
  )
};

Download.propTypes = {
  outputId: PropTypes.string
};
