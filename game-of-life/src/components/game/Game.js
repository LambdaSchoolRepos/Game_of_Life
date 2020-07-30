import React, { useState, useEffect, useRef } from "react";
import Grid from "./Grid";
import BtnContainerBottom from "./BtnContainerBottom";
import BtnContainerRight from "./BtnContainerRight";
import "../../App.css";

const adjacentCells = [
  //orthogonal neighbors
  [-1, 0], // left neighbor
  [1, 0], // right neighbor
  [0, 1], // top neighbor
  [0, -1], // bottom neighbor
  //diagonal neighbors
  [-1, 1], // top left neighbor
  [-1, -1], // bottom left neighbor
  [1, 1], // top right neighbor
  [1, -1], // bottom right neighbor
];

const pentadecathlonAdjacentCells = [
  //top half
  [0, -1], // above
  [-1, -2], // two above, left
  [1, -2], // two above, right
  [0, -3], // three above
  [0, -4], // four above
  //bottom half
  [0, 1], // below
  [0, 2], // two below
  [-1, 3], // three below, left
  [1, 3], // three below, right
  [0, 4], // four below
  [0, 5], // five below
];

function Game() {
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [rows, setRows] = useState(25);
  const [cols, setCols] = useState(25);
  const [grid, setGrid] = useState(
    Array(rows)
      .fill()
      .map(() => Array(cols).fill(0))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [playPause, setPlayPause] = useState("Play");
  const [intervalId, setIntervalId] = useState(useRef(null));

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      //TODO: Make all other buttons (except for pause) and grid unclickable.
      interval = setInterval(() => {
        playLogic();
      }, speed);
    } else if (!isRunning && generation !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, generation]);

  //Bottom Buttons

  function playPauseBtn() {
    if (!isRunning) {
      setPlayPause("Pause");
      setIsRunning(true);
    } else if (isRunning) {
      setPlayPause("Play");
      setIsRunning(false);
    }
  }

  function clear() {
    if (!isRunning) {
      setGeneration(0);
      let nextGrid = JSON.parse(JSON.stringify(grid));
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          nextGrid[i][j] = 0;
        }
      }
      setGrid(nextGrid);
    } else {
      alert("You must pause the game before you can clear it.");
    }
  }

  function step() {
    if (!isRunning) {
      playLogic();
    } else {
      alert("You must pause the game before you can step through it.");
    }
  }

  // Grid Clicking

  function selected(row, col) {
    if (!isRunning && generation === 0) {
      let nextGrid = JSON.parse(JSON.stringify(grid));
      nextGrid[row][col] = nextGrid[row][col] === 0 ? 1 : 0;
      setGrid(nextGrid);
    } else if (isRunning) {
      alert("You cannot update the grid while the game is playing.");
    } else if (generation > 0) {
      alert('You must "clear" the grid before you can update it.');
    }
  }

  //Right Buttons: Presets

  function preset1() {
    // Blinkers
    if (!isRunning && generation === 0) {
      let nextGrid = JSON.parse(JSON.stringify(grid));
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          nextGrid[i][j] = 0;
          if (i % 4 !== 0) {
            if (j % 3 === 0) {
              nextGrid[i][j] = 1;
            }
          }
        }
      }
      setGrid(nextGrid);
    } else if (isRunning) {
      alert("You cannot update the grid while the game is playing.");
    } else if (generation > 0) {
      alert('You must "clear" the grid before you can update it.');
    }
  }

  function preset2() {
    // Boat
    if (!isRunning && generation === 0) {
      let nextGrid = JSON.parse(JSON.stringify(grid));
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          nextGrid[i][j] = 0;
          if (
            i > 0 &&
            j > 0 &&
            i < rows - 1 &&
            j < cols - 1 &&
            (i % 4 !== 0 || ((i + 1) % 4 === 0 && (j + 2) % 4 !== 0)) &&
            (j % 3 !== 0 || ((j + 1) % 4 === 0 && (i + 2) % 4 !== 0))
          ) {
            nextGrid[i][j] = 1;
          }
        }
      }
      setGrid(nextGrid);
    } else if (isRunning) {
      alert("You cannot update the grid while the game is playing.");
    } else if (generation > 0) {
      alert('You must "clear" the grid before you can update it.');
    }
  }

  function preset3() {
    // Pentadecathlon
    let centerRow = Math.floor(rows / 2);
    let centerCol = Math.floor(cols / 2);
    if (!isRunning && generation === 0) {
      let nextGrid = JSON.parse(JSON.stringify(grid));
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          nextGrid[i][j] = 0;
        }
      }
      nextGrid[centerRow][centerCol] = 1;
      pentadecathlonAdjacentCells.forEach(([x, y]) => {
        const adjacentX = centerRow + x;
        const adjacentY = centerCol + y;
        nextGrid[adjacentY][adjacentX] = 1;
      });
      setGrid(nextGrid);
    } else if (isRunning) {
      alert("You cannot update the grid while the game is playing.");
    } else if (generation > 0) {
      alert('You must "clear" the grid before you can update it.');
    }
  }

  function random() {
    if (!isRunning && generation === 0) {
      let nextGrid = JSON.parse(JSON.stringify(grid));
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          nextGrid[i][j] = 0;
          if (Math.floor(Math.random() * (Math.random() * 4)) === 1) {
            nextGrid[i][j] = 1;
          }
        }
      }
      setGrid(nextGrid);
    } else if (isRunning) {
      alert("You cannot update the grid while the game is playing.");
    } else if (generation > 0) {
      alert('You must "clear" the grid before you can update it.');
    }
  }

  //Game Mechanics

  function playLogic() {
    //Double Buffering
    let original = grid;
    let next = JSON.parse(JSON.stringify(grid));

    //Play Logic
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let neighbors = 0;
        adjacentCells.forEach(([x, y]) => {
          const adjacentX = i + x;
          const adjacentY = j + y;
          if (
            adjacentX >= 0 &&
            adjacentX < rows &&
            adjacentY >= 0 &&
            adjacentY < cols
          ) {
            neighbors += original[adjacentX][adjacentY]; //if alive, it's a 1 & will increment neighbors
          }
        });
        if (original[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else if (original[i][j] === 0 && neighbors === 3) {
          next[i][j] = 1;
        }
      }
    }
    setGrid(next);
    setGeneration(generation + 1);
  }

  // Speed Methods

  function decreaseSpeed() {
    setSpeed(speed + 100);
  }

  function increaseSpeed() {
    setSpeed(speed - 100);
  }

  // Size Methods

  function decreaseSize() {
    if (rows === 25) {
      alert("This is the minimum grid size.");
    } else if (rows === 37) {
      setGeneration(0);
      setRows(25);
      setCols(25);
      setGrid(
        Array(25)
          .fill()
          .map(() => Array(25).fill(0))
      );
    } else {
      setGeneration(0);
      setRows(37);
      setCols(37);
      setGrid(
        Array(37)
          .fill()
          .map(() => Array(37).fill(0))
      );
    }
  }

  function increaseSize() {
    if (rows === 50) {
      alert("This is the maximum grid size.");
    } else if (rows === 37) {
      setGeneration(0);
      setRows(50);
      setCols(50);
      setGrid(
        Array(50)
          .fill()
          .map(() => Array(50).fill(0))
      );
    } else {
      setGeneration(0);
      setRows(37);
      setCols(37);
      setGrid(
        Array(37)
          .fill()
          .map(() => Array(37).fill(0))
      );
    }
  }

  //JSX

  return (
    <div>
      <div className="presets">
        <div className="controls">
          <h2>Generation: {generation}</h2>
          <Grid grid={grid} rows={rows} cols={cols} selected={selected} />
          <BtnContainerBottom
            playPause={playPause}
            playPauseBtn={playPauseBtn}
            clear={clear}
            step={step}
            decreaseSpeed={decreaseSpeed}
            increaseSpeed={increaseSpeed}
            decreaseSize={decreaseSize}
            increaseSize={increaseSize}
          />
        </div>
        <BtnContainerRight
          preset1={preset1}
          preset2={preset2}
          preset3={preset3}
          random={random}
        />
      </div>
    </div>
  );
}

export default Game;
