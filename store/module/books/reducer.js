import { handleActions } from 'redux-actions'
import { HOME_GET_BOOKS, HOME_GET_BOOKS_SUCCESS, HOME_GET_BOOKS_ERROR } from './constants'

// exporting type of state for type safe
export type HomeState = {
  books: [], 
  isLoading: false,
  error: ''
}

const initialState: HomeState = {
}

// handle actions
export default handleActions(
  {
    [HOME_GET_BOOKS]: (state: HomeState = initialState, action): HomeState => {
      const payload = action.payload
      return {
        isLoading: true
      }
    },
    [HOME_GET_BOOKS_SUCCESS]: (state: HomeState = initialState, action): HomeState => {
      const payload = action.payload
      return {
        isLoading: false,
        books: payload.books
      }
    },
    [HOME_GET_BOOKS_ERROR]: (state: HomeState = initialState, action): HomeState => {
      const payload = action.payload
      return {
        isLoading: false,
        error: payload.error
      }
    }
  },
  initialState
)