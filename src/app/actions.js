// ==================
// Global actions 
// ==================

// Utilities
import {BatchEffects, FetchPicture, relativeDateString} from './utils'


// Navigates backwards or forwards in time for the gallery
export const Navigate = (prevState, path) => {

  // Create our new state
  const state = {
    ...prevState,
    path
  }

  const dateMinusOne = relativeDateString(state.path, -1);
  const datePlusOne = relativeDateString(state.path, 1);

  const EffectsList = []

  if (!state.pictures[state.path]) {
    EffectsList.push(FetchPicture({date: state.path}))
  }
  if (!state.pictures[dateMinusOne]) {
    EffectsList.push(FetchPicture({date: dateMinusOne}))
  }
  if (!state.pictures[datePlusOne] && state.today !== state.path) {
    EffectsList.push(FetchPicture({date: datePlusOne}))
  }

  // Conditionally add fetch effects in the action's return
  return state.pictures[state.path] && state.pictures[dateMinusOne] && state.pictures[datePlusOne]
    ? state
    : [
        state,
        BatchEffects(EffectsList)
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
