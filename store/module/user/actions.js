import * as types from './constants'
import { actions } from '..'

/**
* Sign in.
* @param {string} username 
* @param {string} password
*/
export const login = (username: string, password: string) => {
  // async call
  return dispatch => {
    // turn loading animation on
    // by dispacthing `loading` action from module `app`.
    // yes, each action can interact with another module actions.
    dispatch({
      type: types.LOGIN
    })
    
    // simulate ajax login
    // in real world you can use `fetch` to make ajax request.
    setTimeout(() => {
      if (username === 'admin' && password === 'secret') {
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: {
            userId: username,
            fullName: 'Clark Kent'
          }
        })
      }
      else{
        dispatch({
          type: types.LOGIN_ERROR,
          payload: {
            error: "Error"
          }
        })
      }     
    }, 3000)
  }
}

/**
* Sign out.
*/
export const logout = () => {
  // direct/sync call
  return {
    type: types.LOGOUT
  }
}
