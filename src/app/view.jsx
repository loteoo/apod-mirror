// Bundle css for this view
import 'sanitize.css'
import './style.css'

import {h} from 'hyperapp'

// Import actions
import {Navigate} from './actions'

// Root view
export const view = state => (
  <div className="app">
    <header>
      <div className="container">
        <h1>APOD mirror</h1>
      </div>
    </header>
    <main>
      <div className="container">
        <button onclick={[Navigate, 'backward']}>Prev</button>
        <button onclick={[Navigate, 'forward']}>Next</button>
        <h4>State: </h4>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </main>
  </div>
)

// http://photoswipe.com/
// https://api.nasa.gov/planetary/apod?api_key=8dUEsh65unCXLDx00RqiRtURx5DNLPSRCtbsJ8v2&date=2018-10-14