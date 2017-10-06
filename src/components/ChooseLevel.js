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
      {lang[props.loc].easy}
    </button>
    <button 
      id="intermediate" 
      onClick={() => props.handleLevel(consts.LEVEL_INTERMEDIATE)}
    >
      {lang[props.loc].intermediate}
    </button>
    <button 
      id="difficult" 
      onClick={() => props.handleLevel(consts.LEVEL_DIFFICULT)}
    >
      {lang[props.loc].difficult}
    </button>
  </div>
)

ChooseLevel.propTypes = {
  activity: PropTypes.string.isRequired,
  handleLevel: PropTypes.func.isRequired,
  loc: PropTypes.string.isRequired
}

export default ChooseLevel