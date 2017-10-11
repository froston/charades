import React from 'react'
import PropTypes from 'prop-types'
import * as consts from '../const'
import lang from '../locale'
import { microphone, draw, theatre } from '../images'

const Button = (props) => {
  const styles = {
    button: {
      height: '33.33%',
      color: '#ffffff',
      fontSize: 50,
      width: '100%',
      flexGrow: 1,
      backgroundColor: props.bgColor,
      borderTop: props.hasBorder ? '1px solid #fff' : 'none',
      borderBottom: props.hasBorder ? '1px solid #fff' : 'none',
    },
    image: {
      verticalAlign: 'middle',
      margin: '0 5px',
      width: 50,
      height: 50
    }
  }
  return (
    <button 
      onClick={props.handleClick}
      style={styles.button}
    >
      {props.image &&
        <img src={props.image} alt={props.title} style={styles.image} />
      }
      <span>{props.title}</span>
    </button>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  image: PropTypes.string,
  bgColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

Button.defaultProps = {
  image: null
}

export default Button