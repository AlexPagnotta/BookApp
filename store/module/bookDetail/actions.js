import * as costants from './constants'
import axios from 'axios';
import { books } from '../books'

/**
* method executed on shelf select changed
*/
export const onSelectShelfChanged = (book: object, selectedShelf: object) => {

  return  (dispatch, getState) => {

    book.shelfId = selectedShelf.id;

    dispatch(books.actions.updateBook(book)).then(function() {

      dispatch({
        type: costants.BOOK_DETAIL_ON_SELECT_SHELF_CHANGED,
        payload: {
          selectedShelf: selectedShelf,
        }
      })

    });     
  }
}

/**
* Set the current shelf selected
*/
export const setSelectedShelf = (selectedShelf: object) => {
  
  return  (dispatch, getState) => {
    
    dispatch({
      type: costants.BOOK_DETAIL_SET_SELECTED_SHELF,
      payload: {
        selectedShelf: selectedShelf,
      }
    })
  }
}