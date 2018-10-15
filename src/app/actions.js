// ==================
// Global actions 
// ==================



export const Navigate = (state, path) => ({
  ...state,
  path
})



export const SetPicture = (state, {date, picture}) => ({
  ...state,
  pictures: {
    ...state.pictures,
    [date]: picture
  }
})
