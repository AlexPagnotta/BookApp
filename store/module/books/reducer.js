import { handleActions } from 'redux-actions'
import { BOOKS_GET_BOOKS, BOOKS_GET_BOOKS_SUCCESS, BOOKS_GET_BOOKS_ERROR } from './constants'

// exporting type of state for type safe
export type BooksState = {
  books: [], 
  isLoading: false,
  error: ''
}

const initialState: BooksState = {
}

// handle actions
export default handleActions(
  {
    [BOOKS_GET_BOOKS]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        isLoading: true
      }
    },
    [BOOKS_GET_BOOKS_SUCCESS]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        isLoading: false,
        books: payload.books
      }
    },
    [BOOKS_GET_BOOKS_ERROR]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        isLoading: false,
        error: payload.error
      }
    }
  },
  initialState
)