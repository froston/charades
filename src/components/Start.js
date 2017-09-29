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
    props.resetGame()
  }
  const handleTouchStart = () => {
    props.handleTouch('start')
  }
  const handleTouchEnd = () => {
    props.handleTouch('end')
  }
  return (
    <div className={(props.timer ? " fase start counting " : "fase start ") + props.activity}>
      <br />
      <h2>{props.activityText}:</h2>
      <h1 
        onTouchStart={handleTouchStart} 
        onTouchEnd={handleTouchEnd} 
        className={props.touched ? '' : 'blured'}
      >
        {props.word}
      </h1>
      <br />
      {props.timer ? 
        <span>{props.timer}</span>
        :
        // Reset or Start button
        props.timer === 0 ?
          <button onClick={handleReset} >{lang.resetButton}</button>
        :
          <div>
            <button onClick={handleStart} >{lang.startButton}</button>
            <br />
            <button className="return" onClick={handleReset} >{lang.returnButton}</button>
          </div>
      }
    </div>
  )
}

Start.propTypes = {
  startTimer: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  handleTouch: PropTypes.func.isRequired,
  activity: PropTypes.string.isRequired,
  activityText: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
  timer: PropTypes.number
}

Start.defaultProps = {
  timer: null
}

export default Start