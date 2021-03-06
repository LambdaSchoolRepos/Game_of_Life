import React from "react";
import Cell from "./Cell";
import "../../App.css";

function Grid(props) {
  let display = [];
  let cellState;
  for (let i = 0; i < props.rows; i++) {
    for (let j = 0; j < props.cols; j++) {
      let cellCoordinates = "" + i + j;
      cellState = props.grid[i][j] === 1 ? "cell alive" : "cell dead";
      display.push(
        <Cell
          cellState={cellState}
          key={cellCoordinates}
          current_row={i}
          current_col={j}
          selected={props.selected}
        />
      );
    }
  }
  return (
    <div className="grid" style={{ width: props.width }}>
      {display}
    </div>
  );
}

export default Grid;
