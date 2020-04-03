import { handleActions } from 'redux-actions'
import { BOOKS_GET_BOOKS, 
  BOOKS_GET_BOOKS_SUCCESS, 
  BOOKS_GET_BOOKS_ERROR,
  BOOKS_UPDATE_BOOK,
  BOOKS_UPDATE_BOOK_SUCCESS,
  BOOKS_UPDATE_BOOK_ERROR,
  BOOKS_REMOVE_BOOK,
  BOOKS_REMOVE_BOOK_SUCCESS,
  BOOKS_REMOVE_BOOK_ERROR
} from './constants'

// exporting type of state for type safe
export type BooksState = {
  books: [], 
  isLoading: Boolean,
  error: string
}

const initialState: BooksState = {
  books: [], 
  isLoading: false,
  error: ''
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
    },

    [BOOKS_UPDATE_BOOK]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        isLoading: true
      }
    },
    [BOOKS_UPDATE_BOOK_SUCCESS]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        isLoading: false
      }
    },
    [BOOKS_UPDATE_BOOK_ERROR]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        isLoading: false,
        error: payload.error
      }
    },

    [BOOKS_REMOVE_BOOK]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        isLoading: true
      }
    },
    [BOOKS_REMOVE_BOOK_SUCCESS]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        isLoading: false
      }
    },
    [BOOKS_REMOVE_BOOK_ERROR]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        isLoading: false,
        error: payload.error
      }
    }
  },
  initialState
)