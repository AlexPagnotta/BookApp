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

      var foundBooks = [];

      if(response.items != null){

          foundBooks = response.items.map(item => 
          {
              return {
                "bookId": 0,
                "apiBookId": item.id,
                "title": item.volumeInfo.title,
                "authors": item.volumeInfo.authors,
                "publisher":  item.volumeInfo.publisher,
                "description": item.volumeInfo.description,
                "pageCount":  item.volumeInfo.pageCount,
                "categories": item.volumeInfo.categories,
                "imageUrl":item.volumeInfo.imageLinks.thumbnail,
                "shelfId": 0
              }
          });
      }
    
      dispatch({
        type: costants.SEARCH_SEARCH_BOOK_SUCCESS,
        payload: {
          foundBooks: foundBooks
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

