import { AuthenticationState, authentication } from './authentication'
import { HomeState, home } from './home'
import { BooksState, books } from './books'
import { ShelvesState, shelves } from './shelves'
import { BookDetailState, bookDetail } from './bookDetail'
import { SearchState, search } from './search'

/**
 * Root states.
 */
export type States = {
  home: HomeState,
  authentication: AuthenticationState,
  books: BooksState,
  shelves: ShelvesState,
  bookDetail: BookDetailState,
  search: SearchState
}

/**
 * Root reducers.
 */
export const reducers = {
  home: home.reducer,
  authentication: authentication.reducer,
  books: books.reducer,
  shelves: shelves.reducer,
  bookDetail: bookDetail.reducer,
  search: search.reducer
}

/**
 * Root actions.
 */
export const actions = {
  home: home.actions,
  authentication: authentication.actions,
  books: books.actions,
  shelves: shelves.actions,
  bookDetail: bookDetail.actions,
  search: search.actions
}

export { home, authentication, books, shelves, bookDetail,search }