// Bundle css for this view
import 'sanitize.css'
import './style.css'

import {h} from 'hyperapp'
import cc from 'classcat'

// Import actions
import {Navigate, ToggleSidebar} from './actions'
import {LeftArrow, RightArrow} from './icons'

// Root view
export const view = state => (
  <div className={cc(['app', {'sidebar-opened': state.sidebarOpened}])}>
    <header>
      <a onclick={ToggleSidebar}>Expand</a>
      <a href="#">Github</a>
    </header>
    <Picture picture={state.pictures[state.path] || {}} />
    <button className="prev" onclick={[Navigate, -1]}><LeftArrow /></button>
    {state.path < state.today ? <button className="next" onclick={[Navigate, 1]}><RightArrow /></button> : null}
    <footer>
      APOD website mirror
    </footer>
  </div>
)


const Picture = ({picture}) => (
  <main>
    <aside>
      <a onclick={ToggleSidebar}>Close</a>
      <p>{picture.date}</p>
      <h2>{picture.title}</h2>
      <p>{picture.explanation}</p>
    </aside>
    <figure>
      <img src={picture.url} alt={picture.title}/>
    </figure>
  </main>
)



// http://photoswipe.com/
// https://www.nationalgeographic.com/photography/photo-of-the-day/2018/10/india-mud-wrestling-kushti//
// https://api.nasa.gov/planetary/apod?api_key=8dUEsh65unCXLDx00RqiRtURx5DNLPSRCtbsJ8v2&date=2018-10-14