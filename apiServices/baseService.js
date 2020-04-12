import axios from 'axios';
import { AsyncStorage } from 'react-native'
import * as globalCostants from '../constants/globalConstants'
import * as RootNavigation from '../rootNavigation/rootNavigation'
import * as SecureStore from 'expo-secure-store';
import {store,  actions } from '../store';

 /**
  * Request Wrapper with default success/error actions
  * @param {*} options 
  * @param {*} isHeader 
  */
const request = async function (options, isHeader = true, isGoogleBooksApi = false) {


  let authToken = null;

  if (isHeader) {
    //authToken = await SecureStore.getItemAsync(globalCostants.TOKEN_KEY); /// Add header
  }

  const client = axios.create({
    baseURL: isGoogleBooksApi ? globalCostants.API_URL_GOOGLE_BOOKS : globalCostants.API_URL,
    headers: isGoogleBooksApi ? {} : {'Authorization': 'Bearer '+ authToken}  
  });

  //Interceptors to handle success and errors
  client.interceptors.response.use(  (response) => {

    console.debug('Call Success: ' + response.config.url);

    return response.data;

  }, (error) => {

    //Get the request
    const originalRequest = error.config;

    //console.debug('Request Failed:', error, originalRequest);

    var errorMessage = '';

    var response = error.response;

    //Reeturn message if BadRequest
    if(response.status === 400){

      errorMessage = response.data.message;

      
    }
    //Try refresh token and retry call, logout if does not work
    else if(response.status === 401){

      //If a try has already been made, return to logim
      if(originalRequest._retry){
        //Execute logout
        store.dispatch(actions.authentication.logout());
        return;
      }
      
      //Avoid loop
      originalRequest._retry = true;

      //Get refresh token
      return SecureStore.getItemAsync(globalCostants.REFRESH_TOKEN_KEY).then(refreshToken => {

        console.debug('Get Refresh Token: ' + refreshToken);

        return client.post('refreshToken/' + refreshToken);

      })
      .then(refreshResponse => {

        console.debug('Updated Token: ' + refreshResponse.token);

        //Update token on storage
        return SecureStore.setItemAsync(globalCostants.TOKEN_KEY,refreshResponse.token);

      })
      .then( () => {

        console.debug('Get new Token from Storage');

        return SecureStore.getItemAsync(globalCostants.TOKEN_KEY);
      })   
      .then( (newToken) => {


        // Change Authorization header
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;

        console.debug('Set token on call: ' + originalRequest.headers['Authorization']);

        // Return originalRequest object with Axios.
        return client(originalRequest); 

      }).catch(error => {
        
        //Execute logout
        store.dispatch(actions.authentication.logout());

      });
    } 
    else{
      errorMessage = 'Error while executing Action.';
    }

    //Build error object
    var error = {
      error, errorMessage
    }

    return Promise.reject(error);
    
  });

  return client(options);
}

export default request;