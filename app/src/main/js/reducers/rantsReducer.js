export default function reducer(state = {
  rants: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case 'FETCH_RANTS': {
      return { ...state, fetching: true, error: action.payload };
    }
    case 'FETCH_RANTS_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'FETCH_RANTS_FULFILLED': {
      return { ...state, fetching: false, fetched: true, rants: action.payload };
    }
    default:
      return { ...state };
  }
}
