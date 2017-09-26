import React from 'react';
import './styles.css';
import * as consts from '../const'

const ChooseActivity = (props) => {
  return (
    <div className="fase">
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

export default ChooseActivity;