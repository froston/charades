import React from 'react';
import { 
  ChooseActivity, 
  ChooseLevel, 
  Start
} from '../components'
import * as consts from '../const'
import { countdown, finish } from '../sounds'

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
    this.setState({ fase: consts.FASE_LEVEL, activity }, 
      () => console.log("ACTIVITY:" + this.state.activity))
  }

  handleLevel = (level) => {
    this.setState({ fase: consts.FASE_START, level }, 
      () => console.log("LEVEL:" + this.state.level))
  }

  startTimer = () => {
    this.setState({ timer: consts.TIMER })
    this.counter = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 })
      if (this.state.timer === 4) {
        this.playCountdown()
      }
      if (this.state.timer === 0) {
        this.stopTimer()
        this.playEnd()
      }
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.counter)
  }

  playCountdown = () => {
    const audio = new Audio(countdown);
    audio.play()
  }  
  
  playEnd = () => {
    const audio = new Audio(finish);
    audio.play()
  }

  startCountdownSound = () => {
    const audio = new Audio(countdown);
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
        return "Explain"
      case consts.ACTIVITY_DRAWING:
        return "Draw"
      case consts.ACTIVITY_PANTOMIMA:
        return "Play"
      default:
        return "Choose Activity!"
    }
  }

  render() {
    let component;
    switch (this.state.fase) {
      case consts.FASE_ACTIVITY:
        component = <ChooseActivity handleActivity={this.handleActivity} />
        break
      case consts.FASE_LEVEL:
        component = <ChooseLevel handleLevel={this.handleLevel}/>
        break
      case consts.FASE_START:
        component = 
          <Start 
            startTimer={this.startTimer} 
            resetGame={this.resetGame} 
            timer={this.state.timer} 
            activity={this.getActivityText()}
          />
        break
      default:
        component = <ChooseActivity handleActivity={this.handleActivity} />
    }
    return component
  }
}

export default App;