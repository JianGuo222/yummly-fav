import { GET_LIST, SET_SEARCH, SAVE_ITEM } from '../ActionTypes';

const initState = {
  q: '',
  rowData: [],
  total: '',
  savedItems: [],
  newPageData: [],
};

export default function results(state = initState, action) {
  switch (action.type) {
    case GET_LIST:
      // console.log('-------------------fetch items');
      // console.log(action.rowData);
      const allData = state.rowData.concat(action.rowData);

      return Object.assign({}, state, {
        rowData: allData,
        newPageData: action.rowData,
        total: action.total,
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

      // console.log('-------------------saved item');
      // console.log(state.savedItems);
      // console.log('-------------------to save item');
      // console.log(action.item);

      return Object.assign({}, state, {
        rowData: newRowData,
        savedItems: targetValue ? state.savedItems.concat([action.item]) : state.savedItems.filter(item => item.id !== action.item.id),
      });
    default:
      return state;
  }
}
