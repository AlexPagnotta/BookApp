import * as types from './constants'

/**
* Set loading status on/off
* @param {boolean} loadingStatus Loading status
*/
export const loading = (loadingStatus: boolean = true) => {
  return {
    type: types.SET_LOADING,
    payload: loadingStatus
  }
}