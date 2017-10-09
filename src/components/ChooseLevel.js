import React from 'react'
import PropTypes from 'prop-types'
import * as consts from '../const'
import lang from '../lang'
import Button from './Button'

const ChooseLevel = (props) => {
  let bgColor;
  if (props.activity === consts.ACTIVITY_SPEAKING) {
    bgColor="#5d1ec9"
  } else if (props.activity === consts.ACTIVITY_DRAWING) {
    bgColor="#1dc95c"
  } else {
    bgColor="#c91d40"
  }
  return (
    <div className={"fase level " + props.activityName}>
      <Button 
        handleClick={() => props.handleLevel(consts.LEVEL_EASY)} 
        bgColor={bgColor}
        title={lang[props.loc].easy}
      />
      <Button 
        handleClick={() => props.handleLevel(consts.LEVEL_INTERMEDIATE)} 
        bgColor={bgColor}
        title={lang[props.loc].intermediate}
        hasBorder
      />
      <Button 
        handleClick={() => props.handleLevel(consts.LEVEL_DIFFICULT)} 
        bgColor={bgColor}
        title={lang[props.loc].difficult}
      />
    </div>
  )
}

ChooseLevel.propTypes = {
  activity: PropTypes.number.isRequired,
  activityName: PropTypes.string.isRequired,
  handleLevel: PropTypes.func.isRequired,
  loc: PropTypes.string.isRequired
}

export default ChooseLevel