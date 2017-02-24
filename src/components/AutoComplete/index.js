import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Immutable from 'immutable';

// components
import Item from './Item';

// actions
import { searchUsers, algoliaSearchReset } from 'store/senderMessage/actions';

// styles
import './styles/auto-complete.scss';

class AutoComplete extends Component {
  static propTypes = {
    max: PropTypes.number,
    onClick: PropTypes.func,
    searchUsers: PropTypes.func,
    algoliaSearchReset: PropTypes.func,
  }

  static defaultProps = {
    max: 4,
  }

  state = {
    input: '',
  }

  handleClick = (input) => {
    const { onClick, algoliaSearchReset } = this.props;

    this.setState({ input }, () => onClick(input));
  }

  handleClickOut = (e) => {
    const { users, algoliaSearchReset } = this.props;

    if (users.size && !this.container.contains(e.target)) {
      algoliaSearchReset();
    }
  }

  handleSearch = (input) => {
    const { searchUsers } = this.props;

    searchUsers(input);
  }

  componentDidMount() {
    const { input } = this.props;

    this.handleSearch(input);
    window.document.body.addEventListener('click', this.handleClickOut);
  }

  componentWillReceiveProps(nextProps) {
    const { input, users, algoliaSearchReset } = this.props;
    const stateInput = this.state.input;

    const nextInput = nextProps.input;
    const nextUsers = nextProps.users;

    if (!Immutable.is(users, nextUsers)) {
      return;
    }

    if (nextInput === stateInput) {
      return algoliaSearchReset();
    }

    if (nextInput !== input) {
      this.handleSearch(nextInput);
    }
  }

  componentWillUnmount() {
    window.document.body.removeEventListener('click', this.handleClickOut);
  }

  render() {
    const { max, users } = this.props;
    const showUsers = users.slice(0, max);

    const items = showUsers.map((user, i) => {
      return <Item
        key={user.get('objectID')}
        user={user}
        onClick={this.handleClick} />
    });

    return (
      <div ref={(e) => (this.container = e)} className="auto-complete-container">
        <ul>
          { items }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.senderMessage.get('users'),
});

const mapDispatchToProps = {
  searchUsers,
  algoliaSearchReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete);
