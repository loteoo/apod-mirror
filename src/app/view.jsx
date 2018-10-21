// Bundle css for this view
import './style.css'

import {h} from 'hyperapp'

// Import actions
import {Navigate, ToggleSidebar} from './actions'
import {LeftArrow, RightArrow, Info, Close, Github, External} from './icons'
import {formatDateString, relativeDateString} from './utils'

// Root view
export const view = (
  state,
  picture = state.pictures[state.path],
  endReached = state.path >= state.today
) => (
  <div className={'app' + (state.sidebarOpened ? ' sidebar-opened' : '')}>
    <header>
      <a onclick={ToggleSidebar}><Info /></a>
      <a href="https://github.com/loteoo/apod-mirror" target="_blank"><Github /></a>
    </header>
    <aside>
      <a onclick={ToggleSidebar}><Close /></a>
      {picture ?
      <div className="content">
        <h2>{picture.title}</h2>
        <h4>
          {picture.copyright ? <span>{picture.copyright}, <br /></span> : null}
          {formatDateString(picture.date)} <br />
        </h4>
        <p>{picture.explanation}</p>
        <br />
        <a href={'https://apod.nasa.gov/apod/ap' + picture.date.substring(2).replace(/-/g, '') + '.html'} target="_blank"><External /></a>
      </div>
      : null}
    </aside>
    <main>
      {
        !picture 
          ? <p>Loading...</p>
          : picture.media_type === 'image'
            ? <a key={picture.date} href={picture.hdurl || picture.url} target="_blank"><img src={picture.url} alt={picture.title} /></a>
            : picture.media_type === 'video'
              ? <div className="youtube"><iframe width="560" height="315" src={picture.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>
              : <p>Media not found</p>
      }
      <a className="prev" href={window.location.pathname + '#/' + relativeDateString(state.path, -1)}><LeftArrow /></a>
      {!endReached ? <a className="next" href={window.location.pathname + '#/' + relativeDateString(state.path, 1)}><RightArrow /></a> : null}
      <footer>
        <p><a href="https://apod.nasa.gov/apod/astropix.html" target="_blank">APOD</a> viewer SPA</p>
        <p>Built with <a href="https://github.com/jorgebucaran/hyperapp">Hyperapp 2.0</a> by <a href="https://github.com/loteoo" target="_blank">Alexandre Lotte</a></p>
      </footer>
    </main>
  </div>
)
