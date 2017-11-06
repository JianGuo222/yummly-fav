
import * as types from '../ActionTypes';
import fetchJson from '../utils/fetchJson';

export function getList(pageLimit, skip) {
  return async (dispatch, getState) => {
    console.log(getState().results.q);
    const data = await fetchJson(`http://api.yummly.com/v1/api/recipes?_app_id=aff9549b&_app_key=a36994afed35bfe1ddc4ed983f54e29c&requirePictures=true&maxResult=${pageLimit}&start=${skip}&q=${getState().results.q}`);
    let rowData = data.matches;
    
    for (let i=0; i<rowData.length; i++) {
      const itemDetails = await fetchJson(`http://api.yummly.com/v1/api/recipe/${rowData[i].id}?_app_id=aff9549b&_app_key=a36994afed35bfe1ddc4ed983f54e29c`);
      rowData[i].images = itemDetails.images;
    }
    dispatch({ type: types.GET_LIST, rowData: rowData, total: data.totalMatchCount });
  };
}

export function setSearch(text) {
  return (dispatch) => {
    dispatch({ type: types.SET_SEARCH, text: text});
  };
}