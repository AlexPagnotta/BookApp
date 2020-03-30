import * as costants from './constants'
import * as globalCostants from '../costants/globalCostants'
import axios from 'axios';
import * as RootNavigation from '../../../rootNavigation/rootNavigation'

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

      var getBooksPromise = axios
                      .get(
                        globalCostants.API_URL + costants.API_URL_NAME
                       );

      var response = await getBooksPromise;
      
      var data = response.data;

      dispatch({
        type: costants.BOOKS_GET_BOOKS_SUCCESS,
        payload: {
          books: data
        }
      })
      
    }
    catch (error) {
      var errorMessage = '';

      var response = error.response;

      if(response.status === 400){
          errorMessage = response.data.message;
      }
      else if(response.status === 401){
        RootNavigation.replace('Login');
      }
      else{
        errorMessage = 'Error! Cannot execute GetBooks.';
      }

      //Error on getBooks
      dispatch({
        type: costants.BOOKS_GET_BOOKS_ERROR,
        payload: {
          callError: errorMessage
        }
      })
    }
  }
}