
import {SetPicture} from './actions'

// Fetch action effect handler
export const FetchPicture =  (props) => ({
  effect: (props, dispatch) => {
    fetch(`https://api.nasa.gov/planetary/apod?date=${props.date}&api_key=8dUEsh65unCXLDx00RqiRtURx5DNLPSRCtbsJ8v2`)
      .then(response => response.json())
      .then(picture => dispatch(SetPicture, {date: props.date, picture}))
      .catch(err => console.log('Fetch error: ', err))
  },
  date: props.date,
})


// Returns a YYYY-MM-DD date string, incremented or decremented
// by a specified amount of days (direction).
export const relativeDateString = (dateStr, direction) => {
  let targetDate = new Date(dateStr);
  targetDate.setDate(targetDate.getDate() + direction);
  return targetDate.toISOString().split('T')[0];
}