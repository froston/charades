import React from 'react'
import PropTypes from 'prop-types'
import lang from '../lang'
import './Start.css'

const Start = (props) => {
  const handleStart = () => {
    if (props.timer === null) {
      props.startTimer()
    }
  }
  const handleReset = () => {
    if(props.timer === 0) {
      props.resetGame()
    }
  }
  return (
    <div className={(props.timer ? " fase start counting " : "fase start ") + props.activity}>
      <br />
      <h2>{props.activityText}:</h2>
      <h1>VERY LONG WORD</h1>
      <br />
      {props.timer ? 
        <span>{props.timer}</span>
        :
        // Reset or Start button
        props.timer === 0 ?
          <button onClick={handleReset} >{lang.resetButton}</button>
        :
          <button onClick={handleStart} >{lang.startButton}</button>
      }
    </div>
  )
}

Start.propTypes = {
  startTimer: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  activity: PropTypes.string.isRequired,
  activityText: PropTypes.string.isRequired,
  timer: PropTypes.number
}

Start.defaultProps = {
  timer: null
}

export default Start