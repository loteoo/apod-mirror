
import {FetchPicture} from './utils'

let today = new Date().toISOString().split('T')[0]

// Initial state of the app
export const init = [{
  path: today,
  pictures: {}
},
  FetchPicture({date: today})
]