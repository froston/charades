import React from 'react'
import PropTypes from 'prop-types'
import * as consts from '../const'
import lang from '../lang'
import { speaker, draw, theatre } from '../images/'
import './ChooseActivity.css'

const ChooseActivity = (props) => (
  <div className="fase activity">
    <button 
      id="speaking" 
      className="button" 
      onClick={() => props.handleActivity(consts.ACTIVITY_SPEAKING)}
    >
      <img src={speaker} alt={lang.speaking} style={{ width: 50 }} />
      <span>{lang.speaking}</span>
    </button>
    <button 
      id="drawing" 
      className="button" 
      onClick={() => props.handleActivity(consts.ACTIVITY_DRAWING)}
    >
      <img src={draw} alt={lang.drawing} style={{ width: 50 }} />
      <span>{lang.drawing}</span>
    </button>
    <button 
      id="pantomima" 
      className="button" 
      onClick={() => props.handleActivity(consts.ACTIVITY_PANTOMIMA)}
    >
      <img src={theatre} alt={lang.pantomima} style={{ width: 50 }} />
      <span>{lang.pantomima}</span>
    </button>
  </div>
)

ChooseActivity.propTypes = {
  handleActivity: PropTypes.func.isRequired
}

export default ChooseActivity