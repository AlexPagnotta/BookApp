import { handleActions } from 'redux-actions'
import { 
  AUTHENTICATION_LOGIN,
  AUTHENTICATION_LOGIN_ERROR, 
  AUTHENTICATION_LOGIN_SUCCESS, 
  AUTHENTICATION_HIDE_ERROR_MODAL,
  AUTHENTICATION_TOGGLE_SECURE_TEXT_ENTRY,
  AUTHENTICATION_LOGOUT, 
  AUTHENTICATION_CHECK_IS_LOGGED,
  AUTHENTICATION_CHECK_IS_LOGGED_SUCCESS,
  AUTHENTICATION_CHECK_IS_LOGGED_ERROR
} from './constants'

/**
 * Define State model
 */
export type AuthenticationState = {
  userId: int,
  userName: string,
  name: string,
  lastName: string,
  callError: string,
  modaErrorVisible: Boolean,
  isLoading: Boolean,
  showSplashScreen: Boolean,
  secureTextEntry: Boolean, 
  isLogged: Boolean
}

/** 
 * Define Initial State
 */
const initialState: AuthenticationState = {
  userId: -1,
  userName: '',
  name: '',
  lastName:'',
  callError: '',
  modalErrorVisible: false,
  isLoading: false,
  showSplashScreen: false,
  secureTextEntry: true,
  isLogged: false
}

export default handleActions(
  {
    [AUTHENTICATION_LOGIN]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      return {
        ...state,
        isLogged: false,
        callError: '',
        modalErrorVisible: false,
        isLoading: true
      }
    },
    [AUTHENTICATION_LOGIN_ERROR]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      const payload = action.payload
      return {
        ...state,
        isLogged: false,
        callError: payload.callError,
        modalErrorVisible: true,
        isLoading: false
      }
    },
    [AUTHENTICATION_LOGIN_SUCCESS]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      const payload = action.payload
      return {
        ...state,
        userId: payload.userId,
        userName: payload.userName,
        name: payload.name,
        lastName: payload.lastName,
        callError: '',
        modalErrorVisible: false,
        isLoading: false,
        isLogged: true,
      }
    },
    [AUTHENTICATION_CHECK_IS_LOGGED]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      const payload = action.payload      
      return {
        ...state,
        showSplashScreen: true
      }
    },
    [AUTHENTICATION_CHECK_IS_LOGGED_SUCCESS]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      const payload = action.payload      
      return {
        ...state,
        showSplashScreen: false,
        isLogged: payload.isLogged
      }
    },
    [AUTHENTICATION_CHECK_IS_LOGGED_ERROR]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      const payload = action.payload      
      return {
        ...state,
        showSplashScreen: false,
        callError: payload.callError
      }
    },

    [AUTHENTICATION_HIDE_ERROR_MODAL]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      return {
        ...state,
        modalErrorVisible: false,
        callError: ''
      }
    },
    [AUTHENTICATION_TOGGLE_SECURE_TEXT_ENTRY]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      return {
        ...state,
        secureTextEntry: !state.secureTextEntry,
      }
    },
    [AUTHENTICATION_LOGOUT]: (state: AuthenticationState = initialState, action): AuthenticationState => {
      return {
        ...state,
        isLogged: false,
        modalErrorVisible: false,
        callError: '',
        authToken: ''
      }
    }
  },

  initialState
)