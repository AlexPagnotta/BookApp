import * as costants from './constants'
import axios from 'axios';
import { books } from '../books'

/**
* method executed on shelf select changed
*/
export const onSelectShelfChanged = (selectedShelfId: object) => {

  return async (dispatch, getState) => {

    //Get current book from state
    let book = getState().bookDetail.currentBook;
  
    //Store the original shelf id
    const shelfIdOriginal = book.shelfId;

    //Update shelf id on book
    book.shelfId = selectedShelfId;

    //Get Shelf selected
    var shelvesSelect = getState().shelves.shelvesSelect;
    var shelfSelect = shelvesSelect.find(shelf => {return shelf.id === book.shelfId});
     
    //Create book if there is no current shelf
    if(shelfIdOriginal === 0){
      
      await dispatch(books.actions.createBook(book));

      //Get created book
      book = getState().books.createdBook;

    }
    //Remove book if no shelf is selected
    else if(selectedShelfId === 0){

      await dispatch(books.actions.removeBook(book.bookId));

      book.bookId = 0;

    }
    //Update book with new shelf
    else{

      await dispatch(books.actions.updateBook(book));
  
    }

    dispatch({
      type: costants.BOOK_DETAIL_SET_CURRENT_BOOK,
      payload: {
        currentBook: book,
        shelfSelected: shelfSelect
      }
    })
    
    await dispatch(books.actions.getBooks());

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