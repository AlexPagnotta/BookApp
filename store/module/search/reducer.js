import { handleActions } from 'redux-actions'
import {  SEARCH_SEARCH_BOOK, 
  SEARCH_SEARCH_BOOK_SUCCESS, 
  SEARCH_SEARCH_BOOK_ERROR, 
  SEARCH_LOAD_MORE,
  SEARCH_LOAD_MORE_SUCCESS,
  SEARCH_LOAD_MORE_ERROR,
  SEARCH_RESET_SEARCH
} from './constants'

// exporting type of state for type safe
export type SearchState = {
  searchedText: String,
  foundBooks: [],
  isLoading: Boolean,
  isLoadingMore: Boolean,
  callError: String
}

const initialState: SearchState = {
  searchedText: "",
  foundBooks: [],
  isLoading: false,
  isLoadingMore: false,
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
        searchedText: payload.searchedText
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

    [SEARCH_LOAD_MORE]: (state: SearchState = initialState, action): SearchState => {
      const payload = action.payload
      return {
        ...state,
        isLoadingMore: true
      }
    },
    [SEARCH_LOAD_MORE_SUCCESS]: (state: SearchState = initialState, action): SearchState => {

      const payload = action.payload

      return {
        ...state,
        isLoadingMore: false,
        foundBooks: state.foundBooks.concat(payload.foundBooks)
      }
    },
    [SEARCH_LOAD_MORE_ERROR]: (state: SearchState = initialState, action): SearchState => {
      const payload = action.payload
      return {
        ...state,
        isLoadingMore: false,
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
        searchedText: "",
      }
    }
  },
  initialState
)