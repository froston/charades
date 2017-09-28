import React from 'react'
import JSONPath from 'jsonpath-plus'
import { 
  ChooseActivity, 
  ChooseLevel, 
  Start
} from '../components'
import * as consts from '../const'
import { beep, finish } from '../sounds'
import { words } from '../data'
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
      word: null,
      usedWords: []
    }
  }

  handleActivity = (activity) => {
    this.setState({ fase: consts.FASE_LEVEL, activity })
  }

  handleLevel = (level) => {
    this.setState({ fase: consts.FASE_START, level }, () => { 
      this.getWord()
    })
  }

  startTimer = () => {
    this.setState({ timer: consts.TIMER })
    this.counter = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 })
      // countdown last 5 seconds
      if (this.state.timer > 0 && this.state.timer < 5 ) {
        this.playSound(beep)
      }
      if (this.state.timer === 0) {
        this.stopTimer()
        this.playSound(finish)
        this.vibrate()
      }
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.counter)
  }

  vibrate = () => {
    // enable vibration support
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
    if (navigator.vibrate) {
      navigator.vibrate(1000);
    }
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
      timer: null,
      word: null,
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

  getWord = () => {
    const allWords = words
    const filtered = allWords.filter((word) => {
      // choose a word fitting activity, level and must not be used yet
      return word[this.getActivityName()] === this.state.level && 
        !this.state.usedWords.includes(word.value + "__" + this.state.activity)
    })
    if (filtered.length > 0) {
      // choose random word from the selection
      const index = Math.floor(Math.random() * filtered.length);
      const finalWord = filtered[index].value;
      this.setState({ 
        word: finalWord, 
        usedWords: this.state.usedWords.concat(finalWord + "__" + this.state.activity)
      })
    } else {
      this.resetGame()
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
        component = this.state.word &&
          <Start 
            word={this.state.word}
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