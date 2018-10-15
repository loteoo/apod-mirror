// ==================
// Global actions 
// ==================

import {FetchPicture} from './utils'


export const Navigate = (prevState, direction) => {

  const state = {
    ...prevState,
    path: direction === 'forward' ? '2018-10-11' : '2018-10-10'
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
