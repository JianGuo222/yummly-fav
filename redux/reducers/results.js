import { GET_LIST } from '../ActionTypes';

export default function results(state = [], action) {
  switch (action.type) {
    case GET_LIST:
      // console.log(action.initState);
      return action.rowData;
    default:
      return state;
  }
}
