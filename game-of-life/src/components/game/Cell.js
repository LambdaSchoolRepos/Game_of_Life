import React from "react";
import "../../App.css";

function Cell(props) {
  function selected() {
    props.selected(props.current_row, props.current_col);
  }

  return (
    <div className={props.cellState} id={props.key} onClick={selected}>
      <div></div>
    </div>
  );
}

export default Cell;
