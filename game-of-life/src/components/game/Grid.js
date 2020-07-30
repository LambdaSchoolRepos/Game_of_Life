import React from "react";
import Cell from "./Cell";
import "../../App.css";

function Grid(props) {
  const width = props.cols * 18 + 1;
  const height = props.rows;
  let rows1 = [];
  let cols1 = [];
  let cellState;
  for (let i = 0; i < props.rows; i++) {
    for (let j = 0; j < props.cols; j++) {
      let cellCoordinates = "" + i + j;
      cellState = props.grid[i][j] === 1 ? "cell alive" : "cell dead";
      rows1.push(
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
    <div className="grid" style={{ width: width }}>
      {rows1}
    </div>
  );
}

export default Grid;
