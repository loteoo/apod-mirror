import {app} from 'hyperapp'
import {init} from './init'
import {view} from './view'
import {Navigate} from './actions'
import {LocationChanged} from './utils'

// Initialize the app
app({
  init,
  view,
  subscriptions: state => LocationChanged({action: Navigate}),
  container: document.body
})