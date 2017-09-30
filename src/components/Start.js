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
  const handleTouch = (event, pos) => {
    event.preventDefault()
    props.handleBlur(pos)
  }
  const handleMouse = (pos) => {
    props.handleBlur(pos)
  }
  return (
    <div className={(props.timer ? " fase start counting " : "fase start ") + props.activity}>
      <br />
      <h2>{props.activityText}:</h2>
      <h1 
        onTouchStart={(event) => handleTouch(event, 'down')}
        onTouchEnd={(event) => handleTouch(event, 'up')}
        onMouseDown={() => handleMouse( 'down')}
        onMouseUp={() => handleMouse( 'up')}
        className={props.blurred ? '' : 'blurred'}
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
  handleBlur: PropTypes.func.isRequired,
  activity: PropTypes.string.isRequired,
  activityText: PropTypes.string.isRequired,
  blurred: PropTypes.bool.isRequired,
  timer: PropTypes.number
}

Start.defaultProps = {
  timer: null
}

export default Start