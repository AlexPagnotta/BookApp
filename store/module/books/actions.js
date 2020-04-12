import * as costants from './constants'
import axios from 'axios';
import BooksService from '../../../apiServices/booksService';

/**
* Execute the async call that get books
*/
export const getBooks = () => {

  return async (dispatch, getState) => {

    //Start getBooks Action
    dispatch({
      type: costants.BOOKS_GET_BOOKS
    })

    try{

      var getBooksPromise = BooksService.getAll();

      var response = await getBooksPromise;
    
      dispatch({
        type: costants.BOOKS_GET_BOOKS_SUCCESS,
        payload: {
          books: response
        }
      })
      
    }
    catch (error) {

      console.log("BooksError" + error);

      //Error on getBooks
      dispatch({
        type: costants.BOOKS_GET_BOOKS_ERROR,
        payload: {
          callError: error.errorMessage
        }
      })
    }
  }
}

/**
* Execute the async call that create a book
*/
export const createBook = (book) => {

  return async (dispatch, getState) => {

    //Start update book Action
    dispatch({
      type: costants.BOOKS_CREATE_BOOK
    })

    try{

      var createBookPromise = BooksService.create(book);

      var response = await createBookPromise;

      dispatch({
        type: costants.BOOKS_CREATE_BOOK_SUCCESS,
        payload: {
          createdBook: response
        }
      })
      
    }
    catch (error) {

      //Error on updateBook
      dispatch({
        type: costants.BOOKS_CREATE_BOOK_ERROR,
        payload: {
          callError: error.errorMessage
        }
      })
    }
  }
}


/**
* Execute the async call that update a book
*/
export const updateBook = (book) => {

  return async (dispatch, getState) => {

    //Start update book Action
    dispatch({
      type: costants.BOOKS_UPDATE_BOOK
    })

    try{

      var updateBookPromise = BooksService.update(book);

      var response = await updateBookPromise;

      dispatch({
        type: costants.BOOKS_UPDATE_BOOK_SUCCESS
      })
      
    }
    catch (error) {

      //Error on updateBook
      dispatch({
        type: costants.BOOKS_UPDATE_BOOK_ERROR,
        payload: {
          callError: error.errorMessage
        }
      })
    }
  }
}

/**
* Execute the async call that remove a book
*/
export const removeBook = (bookId) => {

  return async (dispatch, getState) => {

    //Start update book Action
    dispatch({
      type: costants.BOOKS_REMOVE_BOOK
    })

    try{

      var removeBookPromise = BooksService.remove(bookId);

      var response = await removeBookPromise;

      dispatch({
        type: costants.BOOKS_REMOVE_BOOK_SUCCESS
      })
      
    }
    catch (error) {

      //Error on removeBook
      dispatch({
        type: costants.BOOKS_REMOVE_BOOK_ERROR,
        payload: {
          callError: error.errorMessage
        }
      })
    }
  }
}