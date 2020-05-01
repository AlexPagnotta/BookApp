import { handleActions } from 'redux-actions'
import { SHELVES_GET_SHELVES,
          SHELVES_GET_SHELVES_SUCCESS,
          SHELVES_GET_SHELVES_ERROR,     
          SHELVES_CREATE_SHELF,
          SHELVES_CREATE_SHELF_SUCCESS,
          SHELVES_CREATE_SHELF_ERROR,
          SHELVES_UPDATE_SHELF,
          SHELVES_UPDATE_SHELF_SUCCESS,
          SHELVES_UPDATE_SHELF_ERROR,
          SHELVES_REMOVE_SHELF,
          SHELVES_REMOVE_SHELF_SUCCESS,
          SHELVES_REMOVE_SHELF_ERROR
   } from './constants'

// exporting type of state for type safe
export type ShelvesState = {
  shelves: [], 
  shelvesSelect: [], 
  isLoading: Boolean,
  error: string
}

const initialState: ShelvesState = {
  shelves: [], 
  shelvesSelect: [], 
  isLoading: false,
  error: ''
}

// handle actions
export default handleActions(
  {
    [SHELVES_GET_SHELVES]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: true
      }
    },
    [SHELVES_GET_SHELVES_SUCCESS]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        shelves: payload.shelves,
        shelvesSelect: payload.shelvesSelect
      }
    },
    [SHELVES_GET_SHELVES_ERROR]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        error: payload.error
      }
    },


    [SHELVES_CREATE_SHELF]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: true
      }
    },
    [SHELVES_CREATE_SHELF_SUCCESS]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        shelves: [
          ...state.shelves, 
          payload.createdShelf]
      }
    },
    [SHELVES_CREATE_SHELF_ERROR]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        error: payload.error
      }
    },

    [SHELVES_UPDATE_SHELF]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: true   
      }
    },
    [SHELVES_UPDATE_SHELF_SUCCESS]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        shelves: state.shelves.map((shelf) => { 
          if (shelf.shelfId === action.payload.updatedShelf.shelfId) {
             return { ...shelf,
                 name: action.payload.updatedShelf.name
             };
          }
          return shelf;
        })
      }
    },
    [SHELVES_UPDATE_SHELF_ERROR]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        error: payload.error
      }
    },

    [SHELVES_REMOVE_SHELF]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: true
      }
    },
    [SHELVES_REMOVE_SHELF_SUCCESS]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      
      return {
        ...state,
        isLoading: false,
        shelves: state.shelves.filter(shelf => shelf.shelfId !== payload.shelfId)
      }
    },
    [SHELVES_REMOVE_SHELF_ERROR]: (state: ShelvesState = initialState, action): ShelvesState => {
      const payload = action.payload
      return {
        ...state,
        isLoading: false,
        error: payload.error
      }
    }
  },
  initialState
)