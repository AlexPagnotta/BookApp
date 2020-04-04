import * as costants from './constants'
import axios from 'axios';
import GoogleBookService from '../../../apiServices/googleBookService';

/**
* method that execute search
*/
export const searchBook = (searchText: String) => {

  return async (dispatch, getState) => {

    //Start getBooks Action
    dispatch({
      type: costants.SEARCH_SEARCH_BOOK
    })

    try{

      var searchBooksPromise = GoogleBookService.searchBook(searchText); 

      var response = await searchBooksPromise;
    
      dispatch({
        type: costants.SEARCH_SEARCH_BOOK_SUCCESS,
        payload: {
          foundBooks: response.items == null ? [] : response.items
        }
      })
      
    }
    catch (error) {

      //Error on getBooks
      dispatch({
        type: costants.SEARCH_SEARCH_BOOK_ERROR,
        payload: {
          callError: error.errorMessage
        }
      })
    }

  }
}

