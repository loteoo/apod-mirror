// ==================
// Global actions 
// ==================

import {FetchPicture, relativeDateString} from './utils'


export const Navigate = (prevState, direction) => {

  const state = {
    ...prevState,
    path: relativeDateString(prevState.path, direction)
  }

  return state.pictures[state.path]
    ? state
    : [state, FetchPicture({date: state.path})]
}



export const SetPicture = (state, {date, picture}) => ({
  ...state,
  pictures: {
    ...state.pictures,
    [date]: picture
  }
})
