import * as costants from './constants'
import axios from 'axios';
import { books } from '../books'

/**
* method executed on shelf select changed
*/
export const onSelectShelfChanged = (selectedShelfId: object) => {

  return  (dispatch, getState) => {

    //Get current book from state
    let book = getState().bookDetail.currentBook;
  
    //Store the original shelf id
    const shelfIdOriginal = book.shelfId;

    //Update shelf id on book
    book.shelfId = selectedShelfId;

     //Get Shelf selected
     var shelvesSelect = getState().shelves.shelvesSelect;
     var shelfSelect = shelvesSelect.find(shelf => {
       return shelf.id === book.shelfId});
     
    //Create book if there is no current shelf
    if(shelfIdOriginal === 0){
      dispatch(books.actions.createBook(book)).then(function() {

        dispatch({
          type: costants.BOOK_DETAIL_SET_CURRENT_BOOK,
          payload: {
            currentBook: book,
            shelfSelected: shelfSelect
          }
        })
      }); 
    }
    //Remove book if no shelf is selected
    else if(selectedShelfId === 0){
      dispatch(books.actions.removeBook(book.bookId)).then(function() {

        dispatch({
          type: costants.BOOK_DETAIL_SET_CURRENT_BOOK,
          payload: {
            currentBook: book,
            shelfSelected: shelfSelect
          }
        })
      }); 
    }
    //Update book with new shelf
    else{
      dispatch(books.actions.updateBook(book)).then(function() {
  
        dispatch({
          type: costants.BOOK_DETAIL_SET_CURRENT_BOOK,
          payload: {
            currentBook: book,
            shelfSelected: shelfSelect
          }
        })

      }); 
    }    
  }
}


/**
* Set the current book selected
*/
export const setCurrentBook = (book: object) => {
  
  return  (dispatch, getState) => {

    //Get Shelf selected
    var shelvesSelect = getState().shelves.shelvesSelect;
    var shelfSelect = shelvesSelect.find(shelf => {
      return shelf.id === book.shelfId});
    
    dispatch({
      type: costants.BOOK_DETAIL_SET_CURRENT_BOOK,
      payload: {
        currentBook: book,
        shelfSelected: shelfSelect
      }
    })
  }
}