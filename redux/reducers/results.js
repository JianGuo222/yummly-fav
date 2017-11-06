import { GET_LIST, SET_SEARCH } from '../ActionTypes';

const initState = {
  q: '',
  rowData: [],
  total: ''
};

export default function results(state = initState, action) {
  switch (action.type) {
    case GET_LIST:
      // console.log(action.initState);
      return Object.assign({}, initState, {
        rowData: action.rowData,
        total: action.total,
      });
    case SET_SEARCH:
      console.log(action.text);
      return Object.assign({}, initState, {
        q: action.text,
      });
    default:
      return state;
  }
}
