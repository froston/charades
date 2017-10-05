import React from 'react'
import PropTypes from 'prop-types'
import lang from '../lang/es'
import './Settings.css'

const Settings = (props) => 
<div className={props.show ? "modaloverlay show" : "modaloverlay"}  >
  <div className="modal" tabIndex="0" autoFocus onKeyDown={() => alert(123)} onFocus={() => console.log('FOCUS IS ON BIG RED DIV')}>
    <button className="close" onClick={props.closeModal}>&#10005;</button>
    <div>
      <h2>{lang.settings.settings}</h2>
      {/* <h3>{lang.settings.lang}:</h3>
      <p>Español</p> */}
      <h3>{lang.settings.rules}:</h3>
      <p>...</p>
      <h3>{lang.settings.author}:</h3>
      <p>Pavel Müller</p>
    </div>
  </div>
</div>

Settings.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default Settings