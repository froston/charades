import React from 'react'
import PropTypes from 'prop-types'
import * as consts from '../const'
import lang from '../lang'
import './ChooseLevel.css'

const ChooseLevel = (props) => (
  <div className={"fase level " + props.activity}>
    <button 
      id="easy" 
      className="button" 
      onClick={() => props.handleLevel(consts.LEVEL_EASY)}
    >
      {lang.easy}
    </button>
    <button 
      id="intermediate" 
      className="button" 
      onClick={() => props.handleLevel(consts.LEVEL_INTERMEDIATE)}
    >
      {lang.intermediate}
    </button>
    <button 
      id="difficult" 
      className="button" 
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