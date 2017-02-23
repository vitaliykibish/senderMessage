import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import Item from './Item';

// actions
import { searchUsers, algoliaSearchReset } from 'store/senderMessage/actions';

// styles
import './styles/auto-complete.scss';

class AutoComplete extends Component {
  static propTypes = {
    max: PropTypes.number,
  }

  static defaultProps = {
    max: 4,
  }

  state = {
    email: '',
  }

  handleClick = (email) => {
    const { onClick, algoliaSearchReset } = this.props;

    this.setState({email}, onClick(email));
    algoliaSearchReset();
  }

  handleClickOut = (e) => {
    const { users, algoliaSearchReset } = this.props;
    const isUsers = !!users.size;

    if (isUsers && !this.container.contains(e.target)) {
      algoliaSearchReset();
    }
  }

  handleSearch = (input) => {
    const { searchUsers, algoliaSearchReset } = this.props;

    if (!input) {
      return algoliaSearchReset();
    }

    searchUsers(input);
  }

  componentDidMount() {
    window.document.body.addEventListener('click', this.handleClickOut);
  }

  componentWillReceiveProps(nextProps) {
    const { algoliaSearchReset } = this.props;
    const { input } = nextProps;


    if (input === this.state.email) {
      return algoliaSearchReset();
    }

    if (input !== this.props.input) {
      this.handleSearch(input);
    }
  }

  componentWillUnmount() {
    window.document.body.removeEventListener('click', this.handleClickOut);
  }

  render() {
    const { max, users, input } = this.props;
    const limitedUsers = users.slice(0, max);

    const items = limitedUsers.map((user, i) => {
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
