import React from 'react'
import PropTypes from 'prop-types'
import * as consts from '../const'
import lang from '../lang'
import { microphone, draw, theatre } from '../images'
import './ChooseActivity.css'

const ChooseActivity = (props) => (
  <div className="fase activity">
    <button 
      id="speaking" 
      onClick={() => props.handleActivity(consts.ACTIVITY_SPEAKING)}
    >
      <img src={microphone} alt={lang[props.loc].speaking} style={{ width: 50, height: 50 }} />
      <span>{lang[props.loc].speaking}</span>
    </button>
    <button 
      id="drawing" 
      onClick={() => props.handleActivity(consts.ACTIVITY_DRAWING)}
    >
      <img src={draw} alt={lang[props.loc].drawing} style={{ width: 50, height: 50 }} />
      <span>{lang[props.loc].drawing}</span>
    </button>
    <button 
      id="pantomima" 
      onClick={() => props.handleActivity(consts.ACTIVITY_PANTOMIMA)}
    >
      <img src={theatre} alt={lang[props.loc].pantomima} style={{ width: 50, height: 50 }} />
      <span>{lang[props.loc].pantomima}</span>
    </button>
  </div>
)

ChooseActivity.propTypes = {
  handleActivity: PropTypes.func.isRequired,
  loc: PropTypes.string.isRequired
}

export default ChooseActivity