import React from 'react';
import './styles.css';
import * as consts from '../const'

const ChooseLevel = (props) => (
  <div className="fase">
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
);

export default ChooseLevel;