// Bundle css for this view
import 'sanitize.css'
import './style.css'

import {h} from 'hyperapp'
import cc from 'classcat'

// Import actions
import {Navigate, ToggleSidebar} from './actions'
import {LeftArrow, RightArrow, Expand, Close, Github} from './icons'

// Root view
export const view = state => (
  <div className={cc(['app', {'sidebar-opened': state.sidebarOpened}])}>
    <header>
      <a onclick={ToggleSidebar}><Expand /></a>
      <a href="https://github.com/loteoo/apod-mirror" target="_blank"><Github /></a>
    </header>
    <Picture picture={state.pictures[state.path] || {}} endReached={state.path >= state.today} />
  </div>
)

// Pictude viewer
const Picture = ({picture, endReached}) => (
  <div className="picture">
    <aside>
      <a onclick={ToggleSidebar}><Close /></a>
      <p>{picture.date}</p>
      <h2>{picture.title}</h2>
      <p>{picture.explanation}</p>
      <p>{picture.copyright}</p>
    </aside>
    <main>
      <img src={picture.url} alt={picture.title}/>
      <button className="prev" onclick={[Navigate, -1]}><LeftArrow /></button>
      {!endReached ? <button className="next" onclick={[Navigate, 1]}><RightArrow /></button> : null}
      <footer>
        <p><a href="https://apod.nasa.gov/apod/astropix.html" target="_blank">APOD</a> website mirror</p>
        <p>Built with <a href="https://github.com/jorgebucaran/hyperapp">Hyperapp 2.0</a> by <a href="https://github.com/loteoo" target="_blank">Alexandre Lotte</a></p>
      </footer>
    </main>
  </div>
)
