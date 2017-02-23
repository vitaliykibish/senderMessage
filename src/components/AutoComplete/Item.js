import React, { PropTypes } from 'react';

const propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

const AutoCompleteItem = ({ user, onClick }) => {
  const name = user.get('name');
  const email = user.get('email');

  const handleClick = (e) => {
    e.preventDefault();

    onClick(email);
  };

  return (
    <li className="auto-complete-item">
      <a href="/" onClick={handleClick}>
        <span className="auto-complete-lg">
          { name }
        </span>
        <span className="auto-complete-sm">
          { email }
        </span>
      </a>
    </li>
  );
}

AutoCompleteItem.propTypes = propTypes;

export default AutoCompleteItem;
