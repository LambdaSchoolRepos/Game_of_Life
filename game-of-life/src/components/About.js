import React from "react";
import "../App.css";

function About() {
  return (
    <div>
      <h3>About Conway's Game of Life</h3>
      <p>
        John Conway, an English mathematician known for his research in
        combinatorial game theory, geometric topology, number theory, among many
        other areas, developed the game of life to build upon John von Neumann's
        work on cellular automata (Theory of Self-Reproducing Automata)
        published in 1966.
      </p>
      <h3>Rules</h3>
      <ul>
        <li>
          Any live (green) cell with two or three live neighbours will remain
          alive in the next generation.
        </li>
        <li>
          Any dead (yellow) cell with three live neighbors will become a live
          cell in the next generation.
        </li>
        <li>All other live cells will die in the next generation.</li>
        <li>All other dead cells will remain dead in the next generation.</li>
      </ul>
    </div>
  );
}

export default About;
