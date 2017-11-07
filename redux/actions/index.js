
import * as types from '../ActionTypes';
import fetchJson from '../utils/fetchJson';

export function getList(pageLimit, skip) {
  return async (dispatch, getState) => {
    // console.log(getState().results.q);
    const data = await fetchJson(`http://api.yummly.com/v1/api/recipes?_app_id=aff9549b&_app_key=a36994afed35bfe1ddc4ed983f54e29c&requirePictures=true&maxResult=${pageLimit}&start=${skip}&q=${getState().results.q}`);
    const rowData = data.matches;

    const viewModel = [];

    const savedItems = getState().results.savedItems;

    // console.log(savedItems);

    for (let i=0; i<rowData.length; i++) {
      const itemDetails = await fetchJson(`http://api.yummly.com/v1/api/recipe/${rowData[i].id}?_app_id=aff9549b&_app_key=a36994afed35bfe1ddc4ed983f54e29c`);
      let saved = false;

      for (let i=0; i<savedItems.length; i++) {
        if (savedItems[i].id === itemDetails.id) {
          saved = true;
          break;
        }
      }

      viewModel.push(
        {
          id: itemDetails.id,
          image: itemDetails.images[0].hostedLargeUrl,
          ingredients: itemDetails.ingredientLines,
          link: itemDetails.attribution.url,
          saved: saved,
          name: rowData[i].recipeName,
        }
      );
    }

    // console.log(viewModel);
    dispatch({ type: types.GET_LIST, rowData: viewModel, total: data.totalMatchCount });
  };
}

export function setSearch(text) {
  return (dispatch) => {
    dispatch({ type: types.SET_SEARCH, text: text});
  };
}

export function saveItem(item) {
  return (dispatch) => {
    dispatch({ type: types.SAVE_ITEM, item: item});
  };
}

export function saveNotes(item, notes) {
  return (dispatch) => {
    dispatch({ type: types.SAVE_NOTES, item: item, notes: notes});
  };
}