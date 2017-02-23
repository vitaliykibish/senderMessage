import React, { PropTypes } from 'react';

// styles
import './styles/textArea.scss';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.bool,
  onFocus: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

const Textarea = ({ id, name, value, error, onChange, onFocus }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    onChange(name, value);
  }

  const handleFocus = (e) => {
    const { name } = e.target;
    onFocus(name);
  }

  const className = error ? 'textarea error' : 'textarea';

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      className={className}
      onFocus={handleFocus}
      onChange={handleChange} />
  );
};

Textarea.propTypes = propTypes;

export default Textarea;
