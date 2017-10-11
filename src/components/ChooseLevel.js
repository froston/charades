import React from 'react'
import PropTypes from 'prop-types'
import * as consts from '../const'
import lang from '../lang'
import Button from './Button'

const ChooseLevel = (props) => {
  return (
    <div className="fase level">
      <Button 
        handleClick={() => props.handleLevel(consts.LEVEL_EASY)} 
        bgColor={props.bgColor}
        title={lang[props.loc].easy}
      />
      <Button 
        handleClick={() => props.handleLevel(consts.LEVEL_INTERMEDIATE)} 
        bgColor={props.bgColor}
        title={lang[props.loc].intermediate}
        hasBorder
      />
      <Button 
        handleClick={() => props.handleLevel(consts.LEVEL_DIFFICULT)} 
        bgColor={props.bgColor}
        title={lang[props.loc].difficult}
      />
    </div>
  )
}

ChooseLevel.propTypes = {
  activity: PropTypes.number.isRequired,
  activityName: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  handleLevel: PropTypes.func.isRequired,
  loc: PropTypes.string.isRequired
}

export default ChooseLevel