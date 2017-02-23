import React, { PropTypes } from 'react';

// styles
import './styles/label.scss';

const propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.any,
};

const Label = ({ htmlFor, children }) => {
  return (
    <label className="label" htmlFor={htmlFor}>
      { children }
    </label>
  );
};

Label.propTypes = propTypes;

export default Label;
