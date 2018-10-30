
import {SetPicture} from './actions'

// Batch effects utility
export const BatchEffects = (effects) => ({
  effects,
  effect: (props, dispatch) => 
    props.effects.forEach(effect => effect && effect.effect(effect, dispatch))
})

// Fetch picture effect
export const FetchPicture =  (props) => ({
  effect: (props, dispatch) =>
    fetch(`https://api.nasa.gov/planetary/apod?date=${props.date}&api_key=8dUEsh65unCXLDx00RqiRtURx5DNLPSRCtbsJ8v2`)
      .then(response => response.json())
      .then(picture => {

        // Dispatch action
        dispatch(SetPicture, {date: props.date, picture})

        // Pre-load image in the browser
        new Image().src = picture.url
      })
      .catch(err => console.log('Fetch error: ', err)),
  date: props.date,
})

// Listen to hash changes in the browser
export const LocationChanged = props => ({
  effect: (props, dispatch) => {
    const eventListener = event => {
      const fallback = relativeDateString(new Date().toISOString().split('T')[0], -1)
      const newDate = window.location.hash.substring(2) || fallback
      const prevDate = event.oldURL.substring(0, event.oldURL.indexOf("#/")) || fallback
      dispatch(props.action, newDate, prevDate)
    }
    addEventListener("hashchange", eventListener)
    return () => removeEventListener("hashchange", eventListener)
  },
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
