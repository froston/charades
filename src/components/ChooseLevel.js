import React from 'react'
import PropTypes from 'prop-types'
import * as consts from '../const'
import lang from '../lang'
import './ChooseLevel.css'

const ChooseLevel = (props) => (
  <div className={"fase level " + props.activity}>
    <button 
      id="easy" 
      onClick={() => props.handleLevel(consts.LEVEL_EASY)}
    >
      {lang.easy}
    </button>
    <button 
      id="intermediate" 
      onClick={() => props.handleLevel(consts.LEVEL_INTERMEDIATE)}
    >
      {lang.intermediate}
    </button>
    <button 
      id="difficult" 
      onClick={() => props.handleLevel(consts.LEVEL_DIFFICULT)}
    >
      {lang.difficult}
    </button>
  </div>
)

ChooseLevel.propTypes = {
  activity: PropTypes.string.isRequired,
  handleLevel: PropTypes.func.isRequired
}

export default ChooseLevel