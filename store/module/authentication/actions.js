import * as costants from './constants'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

/**
* Execute the login async call
* @param {string} username 
* @param {string} password
*/
export const login = (username: string, password: string) => {

  return async dispatch => {

    //Start Login Action
    dispatch({
      type: costants.AUTHENTICATION_LOGIN
    })

    try{

      var loginPromise = axios
                      .post(costants.API_URL,{
                        userName: username,
                        password: password
                      });

      var response = await loginPromise;
      
      var data = response.data;

      //Save token
      await SecureStore.setItemAsync(costants.AUTHENTICATION_TOKEN_KEY, data.token)

      dispatch({
        type: costants.AUTHENTICATION_LOGIN_SUCCESS,
        payload: {
          userId: data.userId,
          userName: data.userName,
          name: data.name,
          lastName: data.lastName,
          token: data.token
        }
      })
      
    }
    catch (error) {

      var errorMessage = '';

      var response = error.response;

      if(response.status === 400){
          errorMessage = response.data.message;
      }
      else{
        errorMessage = 'Error! Cannot execute Login.';
      }

      //Error on login
      dispatch({
        type: costants.AUTHENTICATION_LOGIN_ERROR,
        payload: {
          callError: errorMessage
        }
      })
      
      
    }
  }
}

/**
* Hide error modal method
*/
export const hideErrorModal = () => {
  return {
    type: costants.AUTHENTICATION_HIDE_ERROR_MODAL
  } 
}

/**
* Toggle secure text entry method
*/
export const toggleSecureTextEntry = () => {
  return {
    type: costants.AUTHENTICATION_TOGGLE_SECURE_TEXT_ENTRY
  } 
}

/**
* Sign out method
*/
export const logout = () => {

  return async dispatch => {

    await SecureStore.setItemAsync(costants.AUTHENTICATION_TOKEN_KEY, '')

    dispatch({
      type: costants.AUTHENTICATION_LOGOUT,
    })
  }
}
