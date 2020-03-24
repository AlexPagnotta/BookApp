import { handleActions } from 'redux-actions'
import { 
  AUTHENTICATION_LOGIN,
  AUTHENTICATION_LOGIN_ERROR, 
  AUTHENTICATION_LOGIN_SUCCESS, 
  AUTHENTICATION_LOGOUT } from './constants'

/**
 * Define State model
 */
export type AuthenticationState = {
  loggedIn: boolean,
  userId: int,
  userName: string,
  name: string,
  lastName: string,
  token: string,
  callError: string,
  isLoading: Boolean
}

/** 
 * Define Initial State
 */
const initialState: AuthenticationState = {
  loggedIn: false,
  userId: -1,
  userName: '',
  name: '',
  lastName:'',
  token: '',
  callError: '',
  isLoading: false
}

export default handleActions(
  {
    [AUTHENTICATION_LOGIN]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      return {
        loggedIn: false,
        callError: '',
        isLoading: true
      }
    },
    [AUTHENTICATION_LOGIN_ERROR]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      const payload = action.payload
      return {
        loggedIn: false,
        error: payload.error,
        isLoading: false
      }
    },
    [AUTHENTICATION_LOGIN_SUCCESS]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      const payload = action.payload
      return {
        loggedIn: true,
        userId: payload.userId,
        userName: payload.userName,
        name: payload.name,
        lastName: payload.lastName,
        token: payload.token,
        callError: '',
        isLoading: false
      }
    },
    [AUTHENTICATION_LOGOUT]: (): AuthenticationState => {
      return {
        loggedIn: false,
        callError: ''
      }
    }
  },

  initialState
)