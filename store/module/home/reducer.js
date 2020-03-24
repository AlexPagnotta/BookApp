import { handleActions } from 'redux-actions'
/*import { ACTION_NAME } from './constants'*/

// exporting type of state for type safe
export type HomeState = {
}

const initialState: HomeState = {
}

// handle actions
export default handleActions(
  {
    /*[ACTION_NAME]: (state: AppState = initialState, action): AppState => {
      const payload = action.payload
      return {
        property: action.payload
      }
    }*/
  },
  initialState
)