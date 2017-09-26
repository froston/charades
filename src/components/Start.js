import React from 'react';

const Start = (props) => {
  const handleStart = () => {
    if (props.timer === null) {
      props.startTimer()
    }
  }
  const handleReset = () => {
    if(props.timer === 0) {
      props.resetGame()
    }
  }
  return (
    <div className={props.timer ? " fase start counting" : "fase start"}>
      <br />
      <h2>{props.activity}:</h2>
      <h1>VERY LONG WORD</h1>
      <br />
      {props.timer ? 
        <span>{props.timer}</span>
        :
        // Reset or Start button
        props.timer === 0 ?
          <button onClick={handleReset} >RESET GAME</button>
        :
          <button onClick={handleStart} >START GAME</button>
      }
    </div>
  )
}

export default Start;