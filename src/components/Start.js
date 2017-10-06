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
        // Reset or Start button (div for centering)
        props.timer === 0 ?
          <div>
            <button onClick={handleReset} >{lang[props.loc].resetButton}</button>
          </div>
        :
          <div>
            <button onClick={handleStart} >{lang[props.loc].startButton}</button>
            <br />
            <button className="return" onClick={handleReset} >{lang[props.loc].returnButton}</button>
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
  loc: PropTypes.string.isRequired,
  timer: PropTypes.number
}

Start.defaultProps = {
  timer: null
}

export default Start