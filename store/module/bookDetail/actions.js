import * as costants from './constants'
import axios from 'axios';
import { books } from '../books'

/**
* method executed on shelf select changed
*/
export const onSelectShelfChanged = (book: object, selectedShelf: object) => {

  return  (dispatch, getState) => {

    //TODO: Manage Create, if the book has been removed or never added
    //Create book if there is no current shelf
    if(book.shelfId === 0){
      dispatch(books.actions.createBook(book));
    }
    //Remove book if no shelf is selected
    else if(selectedShelf.id === 0){
      dispatch(books.actions.removeBook(book.bookId)).then(function() {

        dispatch({
          type: costants.BOOK_DETAIL_ON_SELECT_SHELF_CHANGED,
          payload: {
            selectedShelf: selectedShelf,
          }
        })
      }); 
    }
    //Update book with new shelf
    else{

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

/**
* Set the current book selected
*/
export const setCurrentBook = (book: object) => {
  
  return  (dispatch, getState) => {
    
    dispatch({
      type: costants.BOOK_DETAIL_SET_CURRENT_BOOK,
      payload: {
        currentBook: book,
      }
    })
  }
}