import { handleActions } from 'redux-actions'
import { 
  AUTHENTICATION_LOGIN,
  AUTHENTICATION_LOGIN_ERROR, 
  AUTHENTICATION_LOGIN_SUCCESS, 
  AUTHENTICATION_HIDE_ERROR_MODAL,
  AUTHENTICATION_TOGGLE_SECURE_TEXT_ENTRY,
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
  isLoading: Boolean,
  secureTextEntry: Boolean
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
  isLoading: false,
  secureTextEntry: true
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
    [AUTHENTICATION_HIDE_ERROR_MODAL]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      return {
        modalErrorVisible: false,
        callError: ''
      }
    },
    [AUTHENTICATION_TOGGLE_SECURE_TEXT_ENTRY]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      return {
        secureTextEntry: !state.secureTextEntry,
      }
    },
    [AUTHENTICATION_LOGOUT]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      return {
        loggedIn: false,
        modalErrorVisible: false,
        callError: ''
      }
    }
  },

  initialState
)