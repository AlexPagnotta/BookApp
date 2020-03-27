import * as types from './constants'

/**
* Execute the async call that get books
*/
export const getBooks = () => {

  return async dispatch => {

    //Start Login Action
    dispatch({
      type: costants.HOME_GET_BOOKS
    })

    try{

      var getBooksPromise = axios
                      .get(costants.API_URL);

      var response = await getBooksPromise;
      
      var data = response.data;

      dispatch({
        type: costants.HOME_GET_BOOKS_SUCCESS,
        payload: {
          userId: data.book
        }
      })
      
    }
    catch (error) {
      //Error on login
      dispatch({
        type: costants.HOME_GET_BOOKS_ERROR,
        payload: {
          error: 'ERRORE' //TODO Change
        }
      })
    }
  }
}