import React from "react";
import "../../App.css";

function BtnContainerRight(props) {
  return (
    <div className="right">
      <button onClick={props.preset1}>Blinkers</button>
      <button onClick={props.preset2}>Boat</button>
      <button onClick={props.preset3}>Pentadecathlon</button>
      <button onClick={props.random}>Random</button>
    </div>
  );
}

export default BtnContainerRight;
