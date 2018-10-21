
import {Navigate} from './actions'

const today = new Date().toISOString().split('T')[0]

const path = window.location.hash.substring(2) || today

// Initial state of the app
export const init = Navigate({
  today,
  path,
  sidebarOpened: window.innerWidth > 640,
  pictures: {}
}, path)