// ==================
// Global actions 
// ==================

// Utilities
import {FetchPicture, relativeDateString} from './utils'


// Navigates backwards or forwards in time for the gallery
export const Navigate = (prevState, direction) => {

  // Create our new state
  const state = {
    ...prevState,
    path: relativeDateString(prevState.path, direction)
  }

  // Conditionally trigger the fetch side effect
  return state.pictures[state.path]
    ? state
    : [state, FetchPicture({date: state.path})]
}


// Sets the received picture in the state
export const SetPicture = (state, {date, picture}) => ({
  ...state,
  pictures: {
    ...state.pictures,
    [date]: picture
  }
})

// Inverts the sidebar opened status
export const ToggleSidebar = (state) => ({
  ...state,
  sidebarOpened: !state.sidebarOpened
})
