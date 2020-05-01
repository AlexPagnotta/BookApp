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
  * @param {*} isGoogleBooksApi 
  */
const request = async function (options, isHeader = true, isGoogleBooksApi = false) {

  let authToken = null;

  //If an header is requested, get it from the secure store
  if (isHeader) {
    authToken = await SecureStore.getItemAsync(globalCostants.TOKEN_KEY); 
  }

  //Create the client
  const client = axios.create({
    baseURL: isGoogleBooksApi ? globalCostants.API_URL_GOOGLE_BOOKS : globalCostants.API_URL,
    headers: isGoogleBooksApi ? {} : {'Authorization': 'Bearer '+ authToken}  
  });

  //Define nterceptors to handle success and errors
  client.interceptors.response.use(  (response) => {

    
    console.debug('API Call Success: ' + response.config.url);

    //Return data of the response
    return response.data;

  }, (error) => {

    //Handle errors of the response

    //Get the request from the error
    const request = error.config;

    console.debug('Request Failed:', error, request); 

    var errorMessage = '';

    var response = error.response;

    //Handle 400 BadRequest case and get an optional message returned
    if(response.status === 400){

      errorMessage = response.data.message;

    }

    //THandle 401 Unathenticated case, try to refresh token and eventually logout
    else if(response.status === 401){

      return handleTokenRefresh(client, request);

    } 

    //Set default error message for the others status code
    else{
      errorMessage = 'Error while executing Action.';
    }

    //Build error object to return 
    var error = {
      error, errorMessage
    }

    return Promise.reject(error);

  });

  //Return client
  return client(options);
}

 /**
  * Method to handle the 401 status code case, and to refresh the token
  * @param {*} client 
  * @param {*} request 
  */
const handleTokenRefresh = async function (client, request) {

  try{

     //If a try has already been made, return to login
     if(request._retry){

      console.debug('Refresh Token Failed, Logging out');

      //A try has already been made, execute logout
      store.dispatch(actions.authentication.logout());
      return;

    }
    
    //Set property to true to avoid loop
    request._retry = true;

    console.debug('Refreshing token after 401 response');

    //Get refresh token from secure store
    var refreshToken = await SecureStore.getItemAsync(globalCostants.REFRESH_TOKEN_KEY)

    console.debug('Found Refresh Token: ' + refreshToken);

    console.debug('Refreshing Tokens...');

    var refreshTokenResponse = await client.post('refreshToken/' + refreshToken);

    //Update tokens on storage

    console.debug('Updated Token: ' + refreshTokenResponse.token);
    console.debug('Updated RefreshToken: ' + refreshTokenResponse.refreshToken);

    await SecureStore.setItemAsync(globalCostants.TOKEN_KEY,refreshTokenResponse.token);
    await SecureStore.setItemAsync(globalCostants.REFRESH_TOKEN_KEY,refreshTokenResponse.refreshToken);

    // Change Authorization header
    request.headers['Authorization'] = 'Bearer ' + refreshTokenResponse.token;

    console.debug('Set new access token on call header: ' + request.headers['Authorization']);

    console.debug('Retry call with new token');

    // Return request object with Axios.
    return client(request); 

  }
  catch(error){

    console.debug('Logging Out, Error while trying to refresh token' + error);

    //Execute logout
    store.dispatch(actions.authentication.logout());

  }
}

export default request;