import { handleActions } from 'redux-actions'
import { BOOK_DETAIL_ON_SELECT_SHELF_CHANGED} from './constants'

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
  },
  initialState
)