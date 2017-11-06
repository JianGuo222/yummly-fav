
import * as types from '../ActionTypes';
import fetchJson from '../utils/fetchJson';

export function getList(pageLimit, skip) {
  return async (dispatch) => {
    // const data = await fetchJson('http://api.yummly.com/v1/api/recipes?_app_id=aff9549b&_app_key=a36994afed35bfe1ddc4ed983f54e29c&requirePictures=true&maxResult=20&start=10');
    const data = await fetchJson(`http://api.yummly.com/v1/api/recipes?_app_id=aff9549b&_app_key=a36994afed35bfe1ddc4ed983f54e29c&requirePictures=true&maxResult=${pageLimit}&start=${skip}`);
    let rowData = data.matches;
    
    for (let i=0; i<rowData.length; i++) {
      const itemDetails = await fetchJson(`http://api.yummly.com/v1/api/recipe/${rowData[i].id}?_app_id=aff9549b&_app_key=a36994afed35bfe1ddc4ed983f54e29c`);
      rowData[i].images = itemDetails.images;
    }
    dispatch({ type: types.GET_LIST, rowData: rowData });
  };
}
