import * as costants from './constants'
import axios from 'axios';
import ShelvesService from '../../../apiServices/shelvesService';

/**
* Execute the async call that get shelves
*/
export const getShelves = () => {

  return async (dispatch, getState) => {

    //Start get shelves Action
    dispatch({
      type: costants.SHELVES_GET_SHELVES
    })

    try{

      var getShelvesPromise = ShelvesService.getAll();

      var response = await getShelvesPromise;

      //Create shelvesSelect
      let shelvesSelect =  response.map((shelf, index) => {
        return {
           text: shelf.name,
           id: shelf.shelfId
        }
      });

      shelvesSelect.push({
        text: 'Rimuovi',
        id: 0
     })

      dispatch({
        type: costants.SHELVES_GET_SHELVES_SUCCESS,
        payload: {
          shelves: response,
          shelvesSelect: shelvesSelect
        }
      })
      
    }
    catch (error) {

      //Error on getBooks
      dispatch({
        type: costants.SHELVES_GET_SHELVES_ERROR,
        payload: {
          callError: error.errorMessage
        }
      })
    }
  }
}

/**
* Execute the async call that update a shelf
*/
export const updateShelf = (shelf) => {

  return async (dispatch, getState) => {

    //Start update shelves Action
    dispatch({
      type: costants.SHELVES_UPDATE_SHELF
    })

    try{

      var updateShelfPromise = ShelvesService.update(shelf);

      var response = await updateShelfPromise;

      dispatch({
        type: costants.SHELVES_UPDATE_SHELF_SUCCESS
      })
      
    }
    catch (error) {

      //Error on updateShelf
      dispatch({
        type: costants.SHELVES_UPDATE_SHELF_ERROR,
        payload: {
          callError: error.errorMessage
        }
      })
    }
  }
}