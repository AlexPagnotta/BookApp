import { handleActions } from 'redux-actions'
import { BOOKS_GET_BOOKS, 
  BOOKS_GET_BOOKS_SUCCESS, 
  BOOKS_GET_BOOKS_ERROR,
  BOOKS_UPDATE_BOOK,
  BOOKS_UPDATE_BOOK_SUCCESS,
  BOOKS_UPDATE_BOOK_ERROR,
  BOOKS_REMOVE_BOOK,
  BOOKS_REMOVE_BOOK_SUCCESS,
  BOOKS_REMOVE_BOOK_ERROR,
  BOOKS_CREATE_BOOK,
  BOOKS_CREATE_BOOK_SUCCESS,
  BOOKS_CREATE_BOOK_ERROR
} from './constants'

// exporting type of state for type safe
export type BooksState = {
  books: [], 
  createdBook: Object,
  isLoading: Boolean,
  error: string
}

const initialState: BooksState = {
  books: [], 
  createdBook: {},
  isLoading: false,
  error: ''
}

// handle actions
export default handleActions(
  {
    [BOOKS_GET_BOOKS]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: true
      }
    },
    [BOOKS_GET_BOOKS_SUCCESS]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        books: payload.books
      }
    },
    [BOOKS_GET_BOOKS_ERROR]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        error: payload.error
      }
    },

    [BOOKS_UPDATE_BOOK]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: true
      }
    },
    [BOOKS_UPDATE_BOOK_SUCCESS]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false
      }
    },
    [BOOKS_UPDATE_BOOK_ERROR]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        error: payload.error
      }
    },

    [BOOKS_REMOVE_BOOK]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: true
      }
    },
    [BOOKS_REMOVE_BOOK_SUCCESS]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false
      }
    },
    [BOOKS_REMOVE_BOOK_ERROR]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        error: payload.error
      }
    },

    [BOOKS_CREATE_BOOK]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: true
      }
    },
    [BOOKS_CREATE_BOOK_SUCCESS]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        ...state,
        createdBook: payload.createdBook,
        isLoading: false
      }
    },
    [BOOKS_CREATE_BOOK_ERROR]: (state: BooksState = initialState, action): BooksState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        error: payload.error
      }
    },


  },
  initialState
)