import React from 'react'
import PropTypes from 'prop-types'
import lang from '../locale'
import './Settings.css'

class Settings extends React.Component {
  componentWillMount() {
    document.addEventListener("keydown", this.onKeyDown)
  }
  componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyDown)
  }
  onKeyDown = (event) => {
    // close on escape
    if (event.keyCode === 27) {
      this.props.closeModal(true)
    }
  }      
  render() {
    return (
      <div className="settings">
        <div className="modal">
          <button className="close" onClick={this.props.closeModal}>&#10005;</button>
          <h2><span>&#9881; </span>{lang[this.props.loc].settings.title}</h2>
          <h3>{lang[this.props.loc].settings.lang}:</h3>
          <select onChange={(event) => this.props.setLanguage(event.target.value)} value={this.props.loc}>
            <option value="es">{lang[this.props.loc].settings.es}</option>
            <option value="en">{lang[this.props.loc].settings.en}</option>
            <option value="cs">{lang[this.props.loc].settings.cs}</option>
          </select>
          <h3>{lang[this.props.loc].settings.rules.title}:</h3>
          <p>{lang[this.props.loc].settings.rules.game}</p>
          <ul>
            <li><b>{lang[this.props.loc].speaking}: </b>{lang[this.props.loc].settings.rules.speaking}</li>
            <li><b>{lang[this.props.loc].drawing}: </b>{lang[this.props.loc].settings.rules.drawing}</li>
            <li><b>{lang[this.props.loc].pantomima}: </b>{lang[this.props.loc].settings.rules.pantomima}</li>
          </ul>
          <p>{lang[this.props.loc].settings.rules.level}: </p>
          <ul>
            <li><b>{lang[this.props.loc].easy}: </b>{lang[this.props.loc].settings.rules.easy}</li>
            <li><b>{lang[this.props.loc].intermediate}: </b>{lang[this.props.loc].settings.rules.intermediate}</li>
            <li><b>{lang[this.props.loc].difficult}: </b>{lang[this.props.loc].settings.rules.difficult}</li>
          </ul>
          <p>{lang[this.props.loc].settings.rules.course}</p>
          <h3>{lang[this.props.loc].settings.author}:</h3>
          <a href="https://plus.google.com/+pavelmüller1" title="Google+">
            Pavel Müller
          </a>
        </div>
      </div>
    )
  }
}


Settings.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  loc: PropTypes.string.isRequired
}

export default Settings