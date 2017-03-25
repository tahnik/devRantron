import rantscript from 'rantscript';

export default function fetchRants(type, amount, page) {
  return (dispatch) => {
    rantscript
      .rants(type, amount, page)
      .then((res) => {
        dispatch({ type: 'FETCH_RANTS_FULFILLED', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_RANTS_REJECTED', payload: err });
      });
  };
}
