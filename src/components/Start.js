import React from 'react'
import PropTypes from 'prop-types'
import lang from '../locale'

const Start = (props) => {
  const handleStart = () => {
    if (props.timer === null) {
      props.startTimer()
    }
  }
  const handleReset = () => {
    props.resetGame()
  }
  const handleStopCount = () => {
    if (confirm(lang[props.loc].stopCountConfirm)) {
      props.resetGame()
    }
  }
  const handleTouch = (event, pos) => {
    if (props.timer > 0) {
      props.handleBlur(pos)
    }
  }
  const handleMouse = (pos) => {
    if (props.timer > 0) {
      props.handleBlur(pos)
    }
  }
  const styles = {
    heading: {
      fontSize: 50,
      textTransform: 'uppercase',
      transition: 'filter .5s',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',     
      msUserSelect: 'none',      
      userSelect: 'none'
    },
    headingBlurred: {
      fontSize: 50,
      textTransform: 'uppercase',
      transition: 'filter .5s',
      WebkitFilter: 'blur(10px)',
      MozFilter: 'blur(10px)',
      msFilter: 'blur(10px)',
      OFilter: 'blur(10px)',
      filter: 'blur(10px)'
    },
    fase: {
      backgroundColor: '#fff',
      color: '#000',
      transition: 'background-color .5s',
    },
    faseCounting: {
      backgroundColor: props.bgColor,
      color: '#fff',
      transition: 'background-color .5s',
    },
    span: {
      flexGrow: 2,
      fontSize: 100,
      color: '#fff'
    },
    buttonStart: {
      flexGrow: 1,
      fontSize: 30,
      backgroundColor: props.bgColor,
      color: '#fff'
    },
    buttonReturn: {
      flexGrow: 1,
      fontSize: 30,
      backgroundColor: '#fff',
      color: props.bgColor,
      borderTop: '1px solid ' + props.bgColor
    },
    buttonStopCount: {
      flexGrow: 1,
      fontSize: 30,
      backgroundColor: props.bgColor,
      color: '#fff',
      borderTop: '1px solid #fff'
    },
    buttonReset: {
      flexGrow: 1,
      fontSize: 30,
      backgroundColor: props.bgColor,
      color: '#fff',
    }
  }
  return (
    <div 
      style={props.timer > 0 ? styles.faseCounting : styles.fase}
      className='fase start'
      onTouchStart={(event) => handleTouch(event, 'down')}
      onTouchEnd={(event) => handleTouch(event, 'up')}
      onMouseDown={() => handleMouse( 'down')}
      onMouseUp={() => handleMouse( 'up')}
    >
      <div style={{ flexGrow: 2 }}>
        <h2 style={{ fontSize: 20 }}>
          {props.activityText}:
        </h2>
        <h1 style={props.blurred && props.timer > 0 ? styles.headingBlurred : styles.heading}>
          {props.word}
        </h1>
      </div>
      {props.timer ? 
        [
          <span key="counter" style={styles.span}>{props.timer}</span>,
          <button 
            key="stopCount" 
            onClick={handleStopCount} 
            style={styles.buttonStopCount} 
          >
            {lang[props.loc].returnButton}
          </button>
        ]
        :
        props.timer === 0 ?
          <button 
            key="reset" 
            onClick={handleReset} 
            style={styles.buttonReset} 
          >
            {lang[props.loc].resetButton}
          </button>
        :
          [
            <button 
              key="start" 
              onClick={handleStart} 
              style={styles.buttonStart} 
            >
              {lang[props.loc].startButton}
            </button>,
            <button 
              key="return" 
              onClick={handleReset} 
              style={styles.buttonReturn} 
            >
              {lang[props.loc].returnButton}
            </button>
          ]
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
