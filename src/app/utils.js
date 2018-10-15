
import {SetPicture} from './actions'

// Fetch action
export const FetchPicture =  (props) => ({
  effect: (props, dispatch) => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=8dUEsh65unCXLDx00RqiRtURx5DNLPSRCtbsJ8v2&date=${props.date}`)
      .then(response => response.json())
      .then(picture => dispatch(SetPicture, {date: props.date, picture}))
      .catch(err => console.log('Fetch error: ', err))
  },
  date: props.date,
})



export const relativeDateString = (dateStr, direction) => {
  
  let targetDate = new Date(dateStr);
  targetDate.setDate(targetDate.getDate() + direction);

  return targetDate.toISOString().split('T')[0];

}