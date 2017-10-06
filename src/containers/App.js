import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { 
  ChooseActivity, 
  ChooseLevel, 
  Start,
  Settings
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
      phase: consts.PHASE_ACTIVITY,
      activity: null,
      level: null,
      timer: null,
      word: null,
      usedWords: [],
      blurred: false,
      showModal: false,
      loc: 'es'
    }
  }

  handleActivity = (activity) => {
    this.setState({ phase: consts.PHASE_LEVEL, activity })
    if (activity === consts.ACTIVITY_SPEAKING) {
      this.enableSounds()
    }
  }

  handleLevel = (level) => {
    this.setState({ phase: consts.PHASE_START, level }, () => { 
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
      navigator.vibrate(1000)
    }
  }

  playSound = (file) => {
    const audio = new Audio(file)
    audio.play()
  }

  enableSounds = () => {
    // workaround for mobile devices
    // https://blog.foolip.org/2014/02/10/media-playback-restrictions-in-blink/
    const audio = new Audio(beep)
    audio.volume = 0
    
    var playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise.then(() => {
        audio.pause()
      })
    }
  }

  resetGame = () => {
    this.setState({
      phase: consts.PHASE_ACTIVITY,
      activity: null,
      level: null,
      timer: null,
      word: null,
    })
  }

  handleBlur = (pos) => {
    this.setState({ blurred: pos == 'down' ? true : false })
  }

  getActivityText = () => {
    const { loc } = this.state;
    switch (this.state.activity) {
      case consts.ACTIVITY_SPEAKING:
        return lang[loc].speaking
      case consts.ACTIVITY_DRAWING:
        return lang[loc].drawing
      case consts.ACTIVITY_PANTOMIMA:
        return lang[loc].pantomima
      default:
        return lang[loc].speaking
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

  setLanguage = (language) => {
    this.setState({ loc: language })
  }

  getWord = () => {
    const allWords = words[this.state.loc]
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

  showModal = (showModal) => {
    this.setState({ showModal })
  }

  render() {
    return (
      <div>
        <a 
          id="settings" 
          onClick={() => this.showModal(true)} 
          title={lang[this.state.loc].settings.settings}
        >
          &#9881;
        </a>
        <CSSTransitionGroup
          transitionName="component"
          transitionAppear
          transitionEnter
          transitionAppearTimeout={700}
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          {this.state.phase === consts.PHASE_ACTIVITY &&
            <ChooseActivity
              handleActivity={this.handleActivity} 
              loc={this.state.loc}
            />
          }
          {this.state.phase === consts.PHASE_LEVEL &&
            <ChooseLevel 
              handleLevel={this.handleLevel} 
              activity={this.getActivityName()}
              loc={this.state.loc} 
            />
          }
          {this.state.phase === consts.PHASE_START &&
            <Start 
              word={this.state.word}
              startTimer={this.startTimer} 
              resetGame={this.resetGame} 
              handleBlur={this.handleBlur}
              blurred={this.state.blurred}
              timer={this.state.timer} 
              activity={this.getActivityName()}
              activityText={this.getActivityText()}
              loc={this.state.loc}
            />
          }
        </CSSTransitionGroup>
        <Settings 
          show={this.state.showModal} 
          loc={this.state.loc}
          setLanguage={this.setLanguage} 
          closeModal={() => this.showModal(false)} 
        />
        <audio src={beep} />
        <audio src={finish} />
      </div>
    )
  }
}

export default App;