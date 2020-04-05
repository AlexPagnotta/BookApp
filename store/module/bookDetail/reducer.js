import { handleActions } from 'redux-actions'
import {  BOOK_DETAIL_SET_CURRENT_BOOK} from './constants'

// exporting type of state for type safe
export type BookDetailState = {
  currentBook: object,
  shelfSelected: object
}

const initialState: BookDetailState = {
  currentBook: {},
  shelfSelected: {}
}

// handle actions
export default handleActions(
  {
    [BOOK_DETAIL_SET_CURRENT_BOOK]: (state: BookDetailState = initialState, action): BookDetailState => {
      const payload = action.payload
      return {
        ...state,
        currentBook: payload.currentBook,
        shelfSelected: payload.shelfSelected
      }
    },
  },
  initialState
)