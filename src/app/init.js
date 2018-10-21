
import {FetchPicture, relativeDateString} from './utils'

let today = relativeDateString(new Date().toISOString().split('T')[0], -1)

// Initial state of the app
export const init = [{
  today,
  path: today,
  sidebarOpened: window.innerWidth > 640,
  pictures: {}
},
  FetchPicture({date: today})
]