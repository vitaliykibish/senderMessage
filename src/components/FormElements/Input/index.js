import React, { PropTypes } from 'react';

// styles
import './styles/input.scss';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.bool,
  onFocus: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

const Input = ({ id, name, type, value, error, onChange, onFocus }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  }

  const handleFocus = (e) => {
    const { name } = e.target;
    onFocus(name);
  }

  const className = error ? 'input error' : 'input';

  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      className={className}
      autoComplete="off"
      onFocus={handleFocus}
      onChange={handleChange} />
  );
};

Input.propTypes = propTypes;

export default Input;
