import { handleActions } from 'redux-actions'
import { SHELVES_GET_SHELVES,
   SHELVES_GET_SHELVES_SUCCESS,
    SHELVES_GET_SHELVES_ERROR } from './constants'

// exporting type of state for type safe
export type ShelvesState = {
  shelves: [], 
  shelvesSelect: [], 
  isLoading: Boolean,
  error: string
}

const initialState: ShelvesState = {
  shelves: [], 
  shelvesSelect: [], 
  isLoading: false,
  error: ''
}

// handle actions
export default handleActions(
  {
    [SHELVES_GET_SHELVES]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        isLoading: true
      }
    },
    [SHELVES_GET_SHELVES_SUCCESS]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        isLoading: false,
        shelves: payload.shelves,
        shelvesSelect: payload.shelvesSelect
      }
    },
    [SHELVES_GET_SHELVES_ERROR]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        isLoading: false,
        error: payload.error
      }
    }
  },
  initialState
)