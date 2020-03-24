import * as types from './constants'

/**
* Execute the login async call
* @param {string} username 
* @param {string} password
*/
export const login = (username: string, password: string) => {

  //TODO Async Call HERE

  return dispatch => {

    //Start Login Action
    dispatch({
      type: types.AUTHENTICATION_LOGIN
    })
    
    // simulate ajax login TEMP
    setTimeout(() => {
      if (username === 'alex' && password === 'test') {

        //Login has succeded
        dispatch({
          type: types.AUTHENTICATION_LOGIN_SUCCESS,
          payload: {
            userId: 1,
            userName: username,
            name: 'Alex',
            lastName: 'Pagnotta',
            token: 'adhwadhwudohqh4he22oqsq'
          }
        })
      }
      else{

        //Error on login
        dispatch({
          type: types.AUTHENTICATION_LOGIN_ERROR,
          payload: {
            callError: "Error"
          }
        })

      }     
    }, 3000)
  }
}

/**
* Sign out method
*/
export const logout = () => {

  return {
    type: types.AUTHENTICATION_LOGOUT
  }
  
}
