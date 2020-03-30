import { AuthenticationState, authentication } from './authentication'
import { HomeState, home } from './home'
import { BooksState, books } from './books'

/**
 * Root states.
 */
export type States = {
  home: HomeState,
  authentication: AuthenticationState,
  books: BooksState
}

/**
 * Root reducers.
 */
export const reducers = {
  home: home.reducer,
  authentication: authentication.reducer,
  books: books.reducer
}

/**
 * Root actions.
 */
export const actions = {
  home: home.actions,
  authentication: authentication.actions,
  books: books.actions
}

export { home, authentication,books }