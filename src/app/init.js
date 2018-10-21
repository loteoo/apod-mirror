
import {BatchEffects, FetchPicture, relativeDateString} from './utils'

const today = new Date().toISOString().split('T')[0]

const path = window.location.hash.substring(2) || today
// Initial state of the app
export const init = [{
  today,
  path,
  sidebarOpened: window.innerWidth > 640,
  pictures: {}
},
  BatchEffects([
    FetchPicture({date: path}),
    FetchPicture({date: relativeDateString(path, -1)}),
    today !== path ? FetchPicture({date: relativeDateString(path, 1)}) : null
  ])
]