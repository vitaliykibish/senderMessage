import algoliasearch from 'algoliasearch';
import keymirror from 'keymirror';

export const SenderMessage = keymirror({
  MESSAGE_SEND: null,
  MESSAGE_SUCCESS: null,
  MESSAGE_FAILURE: null,
  MESSAGE_SEND_MORE: null,
});

export const messageSend = (payload) => ({
  payload,
  type: SenderMessage.MESSAGE_SEND
});

export const messageSuccess = (payload) => ({
  payload,
  type: SenderMessage.MESSAGE_SUCCESS
});

export const messageFailure = (error) => ({
  error,
  type: SenderMessage.MESSAGE_FAILURE
});

export const messageSendMore = () => ({
  type: SenderMessage.MESSAGE_SEND_MORE
});

export const messageFetch = (form) => (dispatch) => {
  dispatch(messageSend(form));

  const body = {
    method: 'POST',
    body: JSON.stringify(form)
  };

  return fetch('http://httpbin.org/post', body)
    .then((response) => {
      if (response.status !== 200) {
        return dispatch(messageFailure(response));
      }

      return dispatch(messageSuccess(true));
    })
    .catch((error) => {
      return dispatch(messageFailure(error));
    });
};

export const AlgoliaSearch = keymirror({
  ALGOLIA_SEARCH_GET: null,
  ALGOLIA_SEARCH_SUCCESS: null,
  ALGOLIA_SEARCH_FAILURE: null,
  ALGOLIA_SEARCH_RESET: null,
});

export const algoliaSearchGet = (payload) => ({
  payload,
  type: AlgoliaSearch.ALGOLIA_SEARCH_GET
});

export const algoliaSearchSuccess = (payload) => ({
  payload,
  type: AlgoliaSearch.ALGOLIA_SEARCH_SUCCESS
});

export const algoliaSearchFailure = (error) => ({
  error,
  type: AlgoliaSearch.ALGOLIA_SEARCH_FAILURE
});

export const algoliaSearchReset = () => ({
  type: AlgoliaSearch.ALGOLIA_SEARCH_RESET
});

export const searchUsers = (input) => (dispatch) => {
  dispatch(algoliaSearchGet(input));

  const id = 'X4CZOFIPYI';
  const key = 'c9d74d1b249831a64803caffb37a4e40';
  const index = 'ideals-people-energy';

  const client = algoliasearch(id, key)
    .initIndex(index);

  return client.search(input)
    .then(({ hits }) => {
      dispatch(algoliaSearchSuccess(hits))
    })
    .catch((error) => {
      return dispatch(algoliaSearchFailure(error));
    });
}
