import React from "react";
import "../../App.css";

function BtnContainerBottom(props) {
  return (
    <div className="bottom">
      <button onClick={props.playPauseBtn}>{props.playPause}</button>
      <button onClick={props.clear}>Clear</button>
      <button onClick={props.step}>Step</button>
    </div>
  );
}

export default BtnContainerBottom;
