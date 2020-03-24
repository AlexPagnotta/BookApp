import { AuthenticationState, authentication } from './authentication'
import { AppState, app } from './app'

/**
 * Root states.
 */
export type States = {
  app: AppState,
  authentication: AuthenticationState
}

/**
 * Root reducers.
 */
export const reducers = {
  app: app.reducer,
  authentication: authentication.reducer
}

/**
 * Root actions.
 */
export const actions = {
  app: app.actions,
  authentication: authentication.actions
}

export { app, authentication }