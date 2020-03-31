import { AuthenticationState, authentication } from './authentication'
import { HomeState, home } from './home'
import { BooksState, books } from './books'
import { ShelvesState, shelves } from './shelves'

/**
 * Root states.
 */
export type States = {
  home: HomeState,
  authentication: AuthenticationState,
  books: BooksState,
  shelves: ShelvesState
}

/**
 * Root reducers.
 */
export const reducers = {
  home: home.reducer,
  authentication: authentication.reducer,
  books: books.reducer,
  shelves: shelves.reducer
}

/**
 * Root actions.
 */
export const actions = {
  home: home.actions,
  authentication: authentication.actions,
  books: books.actions,
  shelves: shelves.actions
}

export { home, authentication,books, shelves }