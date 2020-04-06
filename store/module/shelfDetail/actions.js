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




