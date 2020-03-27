import { handleActions } from 'redux-actions'
import { 
  AUTHENTICATION_LOGIN,
  AUTHENTICATION_LOGIN_ERROR, 
  AUTHENTICATION_LOGIN_SUCCESS, 
  AUTHENTICATION_HIDE_ERROR_MODAL,
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
  modaErrorVisible: Boolean,
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
  modalErrorVisible: false,
  isLoading: false
}

export default handleActions(
  {
    [AUTHENTICATION_LOGIN]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      return {
        loggedIn: false,
        callError: '',
        modalErrorVisible: false,
        isLoading: true
      }
    },
    [AUTHENTICATION_LOGIN_ERROR]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      const payload = action.payload
      return {
        loggedIn: false,
        callError: payload.callError,
        modalErrorVisible: true,
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
        modalErrorVisible: false,
        isLoading: false
      }
    },
    [AUTHENTICATION_HIDE_ERROR_MODAL]: (): AuthenticationState => {
      return {
        modalErrorVisible: false,
        callError: ''
      }
    },
    [AUTHENTICATION_LOGOUT]: (): AuthenticationState => {
      return {
        loggedIn: false,
        modalErrorVisible: false,
        callError: ''
      }
    }
  },

  initialState
)