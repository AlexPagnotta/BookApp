import * as costants from './constants'
import * as globalCostants from '../../../constants/globalConstants'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as RootNavigation from '../../../rootNavigation/rootNavigation'
import AuthenticationService from '../../../apiServices/authenticationService';

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

      var loginPromise = AuthenticationService.login(username, password);

      var response = await loginPromise;
    
      //Save token
      await SecureStore.setItemAsync(globalCostants.TOKEN_KEY, response.token)

      RootNavigation.replace('Home');

      dispatch({
        type: costants.AUTHENTICATION_LOGIN_SUCCESS,
        payload: {
          userId: response.userId,
          userName: response.userName,
          name: response.name,
          lastName: response.lastName,
          authToken: response.token
        }
      })
      
    }
    catch (error) {

      //Error on login
      dispatch({
        type: costants.AUTHENTICATION_LOGIN_ERROR,
        payload: {
          callError: error.errorMessage
        }
      }) 
    }
  }
}

/**
* Hide error modal method
*/
export const getAuthToken = () => {

  return async dispatch => {

    var token = await SecureStore.getItemAsync(globalCostants.TOKEN_KEY)

    dispatch({
      type: costants.AUTHENTICATION_GET_AUTH_TOKEN,
      payload: {
        authToken: token
      }
    })
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

    await SecureStore.setItemAsync(globalCostants.TOKEN_KEY, '')

    RootNavigation.replace('Login');

    dispatch({
      type: costants.AUTHENTICATION_LOGOUT,
    })
  }
}
