import React, { PropTypes } from 'react';

// styles
import './styles/button.scss';

const propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

const Button = ({ type, children, disabled, onClick }) => (
  <button className="button" type={type} disabled={disabled} onClick={onClick}>
    { children }
  </button>
);

Button.propTypes = propTypes;

export default Button;
