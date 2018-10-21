
import {SetPicture} from './actions'

// Batch effects utility
const batchEffect = (props, dispatch) => 
  props.effects.forEach(effect => effect.effect(effect, dispatch))


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

// Returns a YYYY-MM-DD date string, incremented or decremented
// by a specified amount of days (direction).
export const relativeDateString = (dateStr, direction) => {
  let targetDate = new Date(dateStr);
  targetDate.setDate(targetDate.getDate() + direction);
  return targetDate.toISOString().split('T')[0];
}