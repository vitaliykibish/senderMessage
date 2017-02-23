import React, { PropTypes } from 'react';

// styles
import './styles/error.scss';

const propTypes = {
  msg: PropTypes.string.isRequired,
};

const Error = ({ msg }) => (
  <span className="error-msg">{ msg }</span>
);

Error.propTypes = propTypes;

export default Error;
