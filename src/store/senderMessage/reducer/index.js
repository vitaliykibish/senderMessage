import { fromJS } from 'immutable';
import { SenderMessage, AlgoliaSearch } from '../actions';

const initialState = fromJS({
  successMessage: false,
  users: [],
  errors: null,
});

const senderMessage = (state = initialState, { type, error, payload }) => {
  switch (type) {
    case SenderMessage.MESSAGE_SUCCESS:
      return state.update('successMessage', () => true);
    case SenderMessage.MESSAGE_FAILURE:
      return state;
    case SenderMessage.MESSAGE_SEND_MORE:
      return state.update('successMessage', () => false);
    case AlgoliaSearch.ALGOLIA_SEARCH_SUCCESS:
      return state.merge({
        users: payload
      });
    case AlgoliaSearch.ALGOLIA_SEARCH_RESET:
    // case AlgoliaSearch.ALGOLIA_SEARCH_FAILURE:
      return state.merge({
        users: []
      });
    default:
      return state;
  }
}

export default senderMessage;
