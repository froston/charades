import React from 'react';
import { 
  ChooseActivity, 
  ChooseLevel, 
  Start
} from '../components'
import * as consts from '../const'
import { beep, finish } from '../sounds'
import lang from '../lang'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fase: consts.FASE_ACTIVITY,
      activity: null,
      level: null,
      timer: null,
    }
  }

  handleActivity = (activity) => {
    this.setState({ fase: consts.FASE_LEVEL, activity })
  }

  handleLevel = (level) => {
    this.setState({ fase: consts.FASE_START, level })
  }

  startTimer = () => {
    const { timer } = this.state
    this.setState({ timer: consts.TIMER })
    this.counter = setInterval(() => {
      this.setState({ timer: timer - 1 })
      // countdown last 5 seconds
      if (timer > 0 && timer < 5 ) {
        this.playSound(beep)
      }
      if (timer === 0) {
        this.stopTimer()
        this.playSound(finish)
      }
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.counter)
  }

  playSound = (file) => {
    const audio = new Audio(file);
    audio.play()
  }

  resetGame = () => {
    this.setState({
      fase: consts.FASE_ACTIVITY,
      activity: null,
      level: null,
      timer: null
    })
  }

  getActivityText = () => {
    switch (this.state.activity) {
      case consts.ACTIVITY_SPEAKING:
        return lang.speaking
      case consts.ACTIVITY_DRAWING:
        return lang.drawing
      case consts.ACTIVITY_PANTOMIMA:
        return lang.pantomima
      default:
        return lang.speaking
    }
  } 
  
  getActivityName = () => {
    switch (this.state.activity) {
      case consts.ACTIVITY_SPEAKING:
        return "speaking"
      case consts.ACTIVITY_DRAWING:
        return "drawing"
      case consts.ACTIVITY_PANTOMIMA:
        return "pantomima"
      default:
        return "speaking"
    }
  }

  render() {
    let component;
    switch (this.state.fase) {
      case consts.FASE_ACTIVITY:
        component = <ChooseActivity handleActivity={this.handleActivity} />
        break
      case consts.FASE_LEVEL:
        component = <ChooseLevel handleLevel={this.handleLevel} activity={this.getActivityName()} />
        break
      case consts.FASE_START:
        component = 
          <Start 
            startTimer={this.startTimer} 
            resetGame={this.resetGame} 
            timer={this.state.timer} 
            activity={this.getActivityName()}
            activityText={this.getActivityText()}
          />
        break
      default:
        component = <ChooseActivity handleActivity={this.handleActivity} />
    }
    return component
  }
}

export default App;