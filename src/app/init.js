
import {FetchPicture} from './utils'

let today = new Date().toISOString().split('T')[0]

// Initial state of the app
export const init = [{
  today,
  path: today,
  sidebarOpened: true,
  pictures: {}
},
  FetchPicture({date: today})
]