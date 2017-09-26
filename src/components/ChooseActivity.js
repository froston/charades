import React from 'react';
import PropTypes from 'prop-types'
import * as consts from '../const'
import './ChooseActivity.css'

const ChooseActivity = (props) => {
  return (
    <div className="fase activity">
      <button 
        id="speaking" 
        className="button" 
        onClick={() => props.handleActivity(consts.ACTIVITY_SPEAKING)}
      >
        Speaking
      </button>
      <button 
        id="drawing" 
        className="button" 
        onClick={() => props.handleActivity(consts.ACTIVITY_DRAWING)}
      >
        Drawing
      </button>
      <button 
        id="pantomima" 
        className="button" 
        onClick={() => props.handleActivity(consts.ACTIVITY_PANTOMIMA)}
      >
        Pantomima
      </button>
    </div>
  )
}

ChooseActivity.propTypes = {
  handleActivity: PropTypes.func.isRequired
}

export default ChooseActivity