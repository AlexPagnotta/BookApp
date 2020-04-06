import { handleActions } from 'redux-actions'
import {  SHELF_DETAIL_SHOW_MODAL,SHELF_DETAIL_HIDE_MODAL} from './constants'

// exporting type of state for type safe
export type ShelfDetailState = {
  modalVisible: Boolean,
  modalShelf: object
}

const initialState: ShelfDetailState = {
  modalVisible: false,
  modalShelf: {}
}

// handle actions
export default handleActions(
  {
    [SHELF_DETAIL_SHOW_MODAL]: (state: ShelfDetailState = initialState, action): ShelfDetailState => {
      const payload = action.payload
      return {
        ...state,
        modalVisible: true,
        modalShelf: payload.shelf
      }
    },
    [SHELF_DETAIL_HIDE_MODAL]: (state: ShelfDetailState = initialState, action): ShelfDetailState => {
      const payload = action.payload
      return {
        ...state,
        modalVisible: false,
        modalShelf: {}
      }
    },
  },
  initialState
)