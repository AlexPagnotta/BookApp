import * as costants from './constants'
import axios from 'axios';

/**
* method executed on shelf select changed
*/
export const onSelectShelfChanged = (selectedShelf: object) => {

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

/**
* Set the current shelf selected
*/
export const setSelectedShelf = (selectedShelf: object) => {
  
  return  (dispatch, getState) => {

    //TODO: Update Book Shelf
    console.log(selectedShelf);
    
    dispatch({
      type: costants.BOOK_DETAIL_SET_SELECTED_SHELF,
      payload: {
        selectedShelf: selectedShelf,
      }
    })
  }
}