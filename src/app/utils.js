
import {SetPicture} from './actions'

// Batch effects utility
const batchEffect = (props, dispatch) => 
  props.effects.forEach(effect => effect && effect.effect(effect, dispatch))

export const BatchEffects = (effects) => ({
  effects,
  effect: batchEffect
})




// Fetch picture effect
const fetchEffect = (props, dispatch) =>
  fetch(`https://api.nasa.gov/planetary/apod?date=${props.date}&api_key=8dUEsh65unCXLDx00RqiRtURx5DNLPSRCtbsJ8v2`)
    .then(response => response.json())
    .then(picture => {

      // Dispatch action
      dispatch(SetPicture, {date: props.date, picture})

      // Pre-load image in the browser
      new Image().src = picture.url
    })
    .catch(err => console.log('Fetch error: ', err))

export const FetchPicture =  (props) => ({
  effect: fetchEffect,
  date: props.date,
})





const hashchangeEffect = (props, dispatch) => {
  const eventListener = event => dispatch(props.action, window.location.hash.substring(2) || relativeDateString(new Date().toISOString().split('T')[0], -1))
  addEventListener("hashchange", eventListener)
  return () => removeEventListener("hashchange", eventListener)
}

export const LocationChanged = props => ({
  effect: hashchangeEffect,
  action: props.action
})



// Returns a YYYY-MM-DD date string, incremented or decremented
// by a specified amount of days (direction).
export const relativeDateString = (dateStr, direction) => {
  let targetDate = new Date(dateStr);
  targetDate.setDate(targetDate.getDate() + direction);
  return targetDate.toISOString().split('T')[0];
}

// Takes in a YYYY-MM-DD date and returns it in a human format
export const formatDateString = dateStr => (
  dateStr 
    ? (
      new Date(relativeDateString(dateStr, 1)).toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    )
    : null
)