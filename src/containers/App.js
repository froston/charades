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
import lang from '../locale'
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
      blurred: true,
      showModal: false,
      loc: this.getCurrentLanguage()
    }
  }

  getUsedWords = () => {
    const usedWords = sessionStorage.getItem("usedWords") || []
    if (usedWords && usedWords.length) {
      return JSON.parse(sessionStorage.getItem("usedWords"))
    }
    return []
  }
  
  addUsedWord = (word) => {
    const usedWords = this.getUsedWords()
    usedWords.push(word)
    sessionStorage.setItem("usedWords", JSON.stringify(usedWords))
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
    // save word to array of used words
    this.setState({ 
      timer: consts.TIMER,
    })
    this.addUsedWord(this.state.word + "__" + this.state.activity)
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
    }, this.stopTimer())
  }

  handleBlur = (pos) => {
    this.setState({ blurred: pos === 'up' ? true : false })
  }

  getActivityText = () => {
    const { loc } = this.state
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

  getLangName = (lang) => {
    if (lang && typeof lang === "string") {
      const short = lang.substring(0,2)
      if (short === "en" || short === "es" || short === "cs") {
        return short
      }
    }
    return false
  }

  getCurrentLanguage = () => {
    const setLang = localStorage.getItem("charades_lang")
    const navLang = this.getLangName(navigator.language)
    const defaultLang = "en"

    if (setLang && setLang.length == 2) {
      return setLang
    } else if (navLang && navLang.length == 2) {
      return navLang
    } else {
      return defaultLang
    }
  }

  getBgColor = () => {
    switch (this.state.activity) {
      case consts.ACTIVITY_SPEAKING:
        return "#5d1ec9"
      case consts.ACTIVITY_DRAWING:
        return "#1dc95c"
      case consts.ACTIVITY_PANTOMIMA:
        return "#c91d40"
      default:
        return "#000000"
    }
  }

  setLanguage = (language) => {
    localStorage.setItem("charades_lang", language)
    this.setState({ loc: language })
  }

  getWord = () => {
    const allWords = words[this.state.loc]
    const usedWords = this.getUsedWords()
    const filtered = allWords.filter((word) => {
      // choose a word fitting activity, level and must not be used yet
      return word[this.getActivityName()] === this.state.level && 
        !usedWords.includes(word.value + "__" + this.state.activity)
    })
    if (filtered.length > 0) {
      // choose random word from the selection
      const index = Math.floor(Math.random() * filtered.length)
      const finalWord = filtered[index].value
      this.setState({ word: finalWord })
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
        {this.state.phase === consts.PHASE_ACTIVITY &&
          <a 
            id="settings" 
            onClick={() => this.showModal(true)} 
            title={lang[this.state.loc].settings.title}
          >
            &#9881;
          </a>
        }
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
              activity={this.state.activity}
              activityName={this.getActivityName()}
              bgColor={this.getBgColor()}
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
              bgColor={this.getBgColor()}
              loc={this.state.loc}
            />
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="settings"
          transitionEnter
          transitionLeave
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
        {this.state.showModal &&
          <Settings 
            loc={this.state.loc}
            setLanguage={this.setLanguage} 
            closeModal={() => this.showModal(false)} 
          />
        }
        </CSSTransitionGroup>
        <audio src={beep} />
        <audio src={finish} />
      </div>
    )
  }
}

export default App