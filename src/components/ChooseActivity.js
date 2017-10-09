import React from 'react'
import PropTypes from 'prop-types'
import * as consts from '../const'
import lang from '../lang'
import Button from './Button'
import { microphone, draw, theatre } from '../images'

const ChooseActivity = (props) => (
  <div className="fase activity">
    <Button 
      handleClick={() => props.handleActivity(consts.ACTIVITY_SPEAKING)} 
      image={microphone}
      bgColor="#5d1ec9"
      title={lang[props.loc].speaking}
    />
    <Button 
      handleClick={() => props.handleActivity(consts.ACTIVITY_DRAWING)} 
      image={draw}
      bgColor="#1dc95c"
      title={lang[props.loc].drawing}
    />
    <Button 
      handleClick={() => props.handleActivity(consts.ACTIVITY_PANTOMIMA)} 
      image={theatre}
      bgColor="#c91d40"
      title={lang[props.loc].pantomima}
    />
  </div>
)

ChooseActivity.propTypes = {
  handleActivity: PropTypes.func.isRequired,
  loc: PropTypes.string.isRequired
}

export default ChooseActivity