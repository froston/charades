import React from 'react'
import PropTypes from 'prop-types'
import * as consts from '../const'
import './ChooseLevel.css'

const ChooseLevel = (props) => (
  <div className={"fase level " + props.activity}>
    <button 
      id="easy" 
      className="button" 
      onClick={() => props.handleLevel(consts.LEVEL_EASY)}
    >
      Easy
    </button>
    <button 
      id="intermediate" 
      className="button" 
      onClick={() => props.handleLevel(consts.LEVEL_INTERMEDIATE)}
    >
      Intermediate
    </button>
    <button 
      id="difficult" 
      className="button" 
      onClick={() => props.handleLevel(consts.LEVEL_DIFFICULT)}
    >
      Difficult
    </button>
  </div>
)

ChooseLevel.propTypes = {
  activity: PropTypes.string.isRequired,
  handleLevel: PropTypes.func.isRequired
}

export default ChooseLevel