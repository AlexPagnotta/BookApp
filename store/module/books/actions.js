import * as costants from './constants'
import axios from 'axios';
import BooksService from '../../../apiServices/booksService';

/**
* Execute the async call that get books
*/
export const getBooks = () => {

  return async (dispatch, getState) => {

    //Start Login Action
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