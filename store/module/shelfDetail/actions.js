import * as costants from './constants'
import axios from 'axios';
import { shelves } from '../shelves'

/**
* method that show the create edit modal
*/
export const showModal = (shelf: object) => {

  return (dispatch, getState) => {

    //If create, initialize object
    if(shelf == null){
      shelf = {
        shelfId: 0,
        name: ''
      }
    }
 
    dispatch({
      type: costants.SHELF_DETAIL_SHOW_MODAL,
      payload: {
        shelf: shelf
      }
    })
  }
}

/**
* method that hide the create edit modal
*/
export const hideModal = () => {

  return (dispatch, getState) => {
 
    dispatch({
      type: costants.SHELF_DETAIL_HIDE_MODAL
    })
  }
}

/**
* method that save a shelf
*/
export const saveShelf = (shelf) => {

  return async (dispatch, getState) => {
 
    //If no id is present, creates the shelf
    //Otherwise update it
    if(shelf.shelfId === 0){
      await dispatch(shelves.actions.createShelf(shelf));
    }
    else
    {
      await dispatch(shelves.actions.updateShelf(shelf));
    }

    dispatch({
      type: costants.SHELF_DETAIL_HIDE_MODAL
    })
    
  }
}






