import { handleActions } from 'redux-actions'
import { BOOK_DETAIL_ON_SELECT_SHELF_CHANGED, BOOK_DETAIL_SET_SELECTED_SHELF} from './constants'

// exporting type of state for type safe
export type BookDetailState = {
  selectedShelf: object
}

const initialState: BookDetailState = {
}

// handle actions
export default handleActions(
  {
    [BOOK_DETAIL_ON_SELECT_SHELF_CHANGED]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        selectedShelf: payload.selectedShelf
      }
    },
    [BOOK_DETAIL_SET_SELECTED_SHELF]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        selectedShelf: payload.selectedShelf
      }
    },
  },
  initialState
)