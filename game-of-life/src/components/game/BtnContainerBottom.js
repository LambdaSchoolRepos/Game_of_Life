import React from "react";
import "../../App.css";

function BtnContainerBottom(props) {
  return (
    <div className="bottom_parent">
      <div className="bottom_1">
        <button onClick={props.playPauseBtn}>{props.playPause}</button>
        <button onClick={props.clear}>Clear</button>
        <button onClick={props.step}>Step</button>
      </div>
      <div className="bottom_2">
        <div className="left_side">
          <button onClick={props.decreaseSpeed}>-</button>
          <div>Speed</div>
          <button onClick={props.increaseSpeed}>+</button>
        </div>
        <div className="right_side">
          <button onClick={props.decreaseSize}>-</button>
          <div>Size</div>
          <button onClick={props.increaseSize}>+</button>
        </div>
      </div>
    </div>
  );
}

export default BtnContainerBottom;
