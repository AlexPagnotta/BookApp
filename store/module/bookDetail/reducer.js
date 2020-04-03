import { handleActions } from 'redux-actions'
import { BOOK_DETAIL_ON_SELECT_SHELF_CHANGED, BOOK_DETAIL_SET_SELECTED_SHELF,BOOK_DETAIL_SET_CURRENT_BOOK} from './constants'

// exporting type of state for type safe
export type BookDetailState = {
  currentBook: object,
  selectedShelf: object
}

const initialState: BookDetailState = {
  currentBook: {test:2},
  selectedShelf: {}
}

// handle actions
export default handleActions(
  {
    [BOOK_DETAIL_ON_SELECT_SHELF_CHANGED]: (state: BookDetailState = initialState, action): BookDetailState => {
      const payload = action.payload
      return {
        ...state,
        selectedShelf: payload.selectedShelf
      }
    },
    [BOOK_DETAIL_SET_SELECTED_SHELF]: (state: BookDetailState = initialState, action): BookDetailState => {
      const payload = action.payload
      return {
        ...state,
        selectedShelf: payload.selectedShelf,
      }
    },
    [BOOK_DETAIL_SET_CURRENT_BOOK]: (state: BookDetailState = initialState, action): BookDetailState => {
      const payload = action.payload
      return {
        ...state,
        currentBook: payload.currentBook
      }
    },
  },
  initialState
)