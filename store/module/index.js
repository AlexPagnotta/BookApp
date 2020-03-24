import { AuthenticationState, authentication } from './authentication'
import { HomeState, home } from './home'

/**
 * Root states.
 */
export type States = {
  home: HomeState,
  authentication: AuthenticationState
}

/**
 * Root reducers.
 */
export const reducers = {
  home: home.reducer,
  authentication: authentication.reducer
}

/**
 * Root actions.
 */
export const actions = {
  home: home.actions,
  authentication: authentication.actions
}

export { home, authentication }