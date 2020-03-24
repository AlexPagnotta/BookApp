import { handleActions } from 'redux-actions'
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from './constants'

export type UserState = {
  loggedIn: boolean,
  userId: string,
  fullName: string,
  error: string,
  isLoading: Boolean
}

const initialState: UserState = {
  loggedIn: false,
  userId: '',
  fullName: '',
  error: '',
  isLoading : false
}

export default handleActions(
  {
    [LOGIN]: (state: UserState = initialState, action): UserState => {
      return {
        loggedIn: false,
        error: '',
        isLoading: true
      }
    },
    [LOGIN_ERROR]: (state: UserState = initialState, action): UserState => {
      const p = action.payload
      return {
        loggedIn: false,
        error: p.error,
        isLoading: false
      }
    },
    [LOGIN_SUCCESS]: (state: UserState = initialState, action): UserState => {
      const p = action.payload
      return {
        loggedIn: true,
        userId: p.userId,
        fullName: p.fullName,  
        error: '',
        isLoading: false
      }
    },
    [LOGOUT]: (): UserState => {
      return {
        loggedIn: false
      }
    }
  },

  initialState
)