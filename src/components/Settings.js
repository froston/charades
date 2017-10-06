import React from 'react'
import PropTypes from 'prop-types'
import lang from '../lang'
import './Settings.css'

class Settings extends React.Component {
  componentWillMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }
  componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyDown);
  }
  onKeyDown = (event) => {
    // close on escape
    if (event.keyCode === 27) {
      if (this.props.show === true) {
        this.props.closeModal(true)
      }
    }
  }      
  render() {
    return (
      <div className={this.props.show ? "settings show" : "settings"}  >
        <div className="modal">
          <button className="close" onClick={this.props.closeModal}>&#10005;</button>
          <div>
            <h2><span>&#9881;</span>{lang[this.props.loc].settings.settings}</h2>
            <h3>{lang[this.props.loc].settings.lang}:</h3>
            <select onChange={(event) => this.props.setLanguage(event.target.value)} value={this.props.loc}>
              <option value="es">{lang[this.props.loc].settings.es}</option>
              <option value="en">{lang[this.props.loc].settings.en}</option>
            </select>
            <h3>{lang[this.props.loc].settings.rules}:</h3>
            <p>...</p>
            <h3>{lang[this.props.loc].settings.author}:</h3>
            <a href="https://plus.google.com/+pavelmüller1" title="Google+">
              Pavel Müller
            </a>
          </div>
        </div>
      </div>
    )
  }
}


Settings.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  loc: PropTypes.string.isRequired
}

export default Settings