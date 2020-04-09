import { handleActions } from 'redux-actions'
import {  SEARCH_SEARCH_BOOK, SEARCH_SEARCH_BOOK_SUCCESS, SEARCH_SEARCH_BOOK_ERROR, SEARCH_RESET_SEARCH} from './constants'

// exporting type of state for type safe
export type SearchState = {
  foundBooks: [],
  isLoading: Boolean,
  callError: String
}

const initialState: SearchState = {
  foundBooks: [],
  isLoading: false,
  callError: ""
}

// handle actions
export default handleActions(
  {
    [SEARCH_SEARCH_BOOK]: (state: SearchState = initialState, action): SearchState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: true
      }
    },
    [SEARCH_SEARCH_BOOK_SUCCESS]: (state: SearchState = initialState, action): SearchState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        foundBooks: payload.foundBooks,
      }
    },
    [SEARCH_SEARCH_BOOK_ERROR]: (state: SearchState = initialState, action): SearchState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        callError: payload.callError
      }
    },
    [SEARCH_RESET_SEARCH]: (state: SearchState = initialState, action): SearchState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        callError: "",
        foundBooks: [],
      }
    }
  },
  initialState
)