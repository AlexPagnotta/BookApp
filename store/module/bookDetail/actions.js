import * as costants from './constants'
import axios from 'axios';

/**
* method executed on shelf select changed
*/
export const onSelectShelfChanged = (selectedShelf: object) => {

  console.log(selectedShelf)

  return  (dispatch, getState) => {

    //TODO: Update Book Shelf
    
    dispatch({
      type: costants.BOOK_DETAIL_ON_SELECT_SHELF_CHANGED,
      payload: {
        selectedShelf: selectedShelf,
      }
    })
  }
}