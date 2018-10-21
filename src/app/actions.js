// ==================
// Global actions 
// ==================

// Utilities
import {BatchEffects, FetchPicture, relativeDateString} from './utils'


// Navigates backwards or forwards in time for the gallery
export const Navigate = (prevState, direction) => {

  // Create our new state
  const state = {
    ...prevState,
    path: relativeDateString(prevState.path, direction)
  }

  const dateMinusOne = relativeDateString(state.path, -1); 

  // Conditionally add fetch effects in the action's return
  return state.pictures[state.path] && state.pictures[dateMinusOne]
    ? state
    : state.pictures[state.path] && !state.pictures[dateMinusOne]
      ? [
        state,
        FetchPicture({date: dateMinusOne})
      ]
      : !state.pictures[state.path] && state.pictures[dateMinusOne]
        ? [
          state,
          FetchPicture({date: state.path})
        ]
        : [
          state,
          BatchEffects([
            FetchPicture({date: state.path}),
            FetchPicture({date: dateMinusOne})
          ])
        ]
}



// Sets the received picture in the state
export const SetPicture = ({pictures, ...state}, {date, picture}) => ({
  ...state,
  pictures: {
    ...pictures,
    [date]: picture
  }
})

// Inverts the sidebar opened status
export const ToggleSidebar = ({sidebarOpened, ...state}) => ({
  ...state,
  sidebarOpened: !sidebarOpened
})
