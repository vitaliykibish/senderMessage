import React, { PropTypes } from 'react';

// styles
import './styles/form.scss';

const propTypes = {
  children: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
};

const Form = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit}>
      { children }
    </form>
  );
};

Form.propTypes = propTypes;

export default Form;
