
import {relativeDateString} from './utils'
import {Navigate} from './actions'

const today = relativeDateString(new Date().toISOString().split('T')[0], -1)

const path = window.location.hash.substring(2) || today

// Initial state of the app
export const init = Navigate({
  today,
  path,
  direction: 'none',
  sidebarOpened: window.innerWidth > 640,
  pictures: {}
}, path, today)