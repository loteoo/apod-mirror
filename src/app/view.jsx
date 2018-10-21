// Bundle css for this view
import './style.css'

import {h} from 'hyperapp'

// Import actions
import {Navigate, ToggleSidebar} from './actions'
import {LeftArrow, RightArrow, Expand, Close, Github} from './icons'

// Root view
export const view = (
  state,
  picture = state.pictures[state.path],
  endReached = state.path >= state.today
) => (
  <div className={'app' + (state.sidebarOpened ? ' sidebar-opened' : '')}>
    <header>
      <a onclick={ToggleSidebar}><Expand /></a>
      <a href="https://github.com/loteoo/apod-mirror" target="_blank"><Github /></a>
    </header>
    <aside>
      <a onclick={ToggleSidebar}><Close /></a>
      {
        picture
          ? (
            <div className="content">
              <p>{picture.date}</p>
              <h2>{picture.title}</h2>
              <p>{picture.explanation}</p>
              <p>{picture.copyright}</p>
            </div>
          )
          : (
            <div className="loading">
              Loading...
            </div>
          )
      }
    </aside>
    <main>
      {picture ? <img src={picture.url} alt={picture.title}/> : <p>Loading...</p>}
      <button className="prev" onclick={[Navigate, -1]}><LeftArrow /></button>
      {!endReached ? <button className="next" onclick={[Navigate, 1]}><RightArrow /></button> : null}
      <footer>
        <p><a href="https://apod.nasa.gov/apod/astropix.html" target="_blank">APOD</a> viewer SPA</p>
        <p>Built with <a href="https://github.com/jorgebucaran/hyperapp">Hyperapp 2.0</a> by <a href="https://github.com/loteoo" target="_blank">Alexandre Lotte</a></p>
      </footer>
    </main>
  </div>
)
