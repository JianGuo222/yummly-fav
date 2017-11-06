import { GET_LIST, SET_SEARCH, SAVE_ITEM } from '../ActionTypes';

const initState = {
  q: '',
  rowData: [],
  total: '',
  savedItems: [],
};

export default function results(state = initState, action) {
  switch (action.type) {
    case GET_LIST:
      // console.log(action.initState);
      return Object.assign({}, state, {
        rowData: action.rowData,
        total: action.total,
        savedItems: action.rowData.filter(item => item.saved),
      });
    case SET_SEARCH:
      return Object.assign({}, state, {
        q: action.text,
      });
    case SAVE_ITEM:
      const newRowData = [...state.rowData];
      // console.log(newRowData);
      const targetValue = !action.item.saved;
      newRowData.forEach((item) => {
        if (item.id === action.item.id) {
          item.saved = targetValue;
        }
      });
      // console.log(newRowData);
      // console.log(action.item);
      // console.log(state.savedItems.concat([action.item]));
      return Object.assign({}, state, {
        rowData: newRowData,
        savedItems: targetValue ? state.savedItems.concat([action.item]) : state.savedItems.filter(item => item.id !== action.item.id),
      });
    default:
      return state;
  }
}
