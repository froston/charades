import React from 'react';
import PropTypes from 'prop-types'
import * as consts from '../const'
import lang from '../lang'
import './ChooseActivity.css'

const ChooseActivity = (props) => {
  return (
    <div className="fase activity">
      <img src="../images/speaker.svg" />
      <button 
        id="speaking" 
        className="button" 
        onClick={() => props.handleActivity(consts.ACTIVITY_SPEAKING)}
      >
        {lang.speaking}
      </button>
      <button 
        id="drawing" 
        className="button" 
        onClick={() => props.handleActivity(consts.ACTIVITY_DRAWING)}
      >
        {lang.drawing}
      </button>
      <button 
        id="pantomima" 
        className="button" 
        onClick={() => props.handleActivity(consts.ACTIVITY_PANTOMIMA)}
      >
        {lang.pantomima}
      </button>
    </div>
  )
}

ChooseActivity.propTypes = {
  handleActivity: PropTypes.func.isRequired
}

export default ChooseActivity