import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

const Board = ({ nrows = 4, ncols = 4, chanceLightStartsOn = 0.75 }) => {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    return Array.from({ length: nrows }).map((row) =>
      Array.from({ length: ncols }).map(col => Math.random() < chanceLightStartsOn)
    );
  }

  const hasWon = () => {
    // check the board in state to determine whether the player has won.
    return board.every(row => row.every(col => !col));
  }

  const flipCellsAround = (coord) => {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = oldBoard.map(row => row.slice());

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y, x - 1, newBoard);

      // TODO: return the copy
      return newBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon())
    return (<div>You Won!</div>)

  // make table board
  return (
    <table className="Board">
      <tbody>{board.map((row, y) =>
        <tr key={y}>
          {row.map((isLit, x) => {
            let coord = `${y}-${x}`;
            return <Cell key={coord}
              flipCellsAroundMe={() => flipCellsAround(coord)}
              isLit={isLit} />
          })}
        </tr>)}
      </tbody>
    </table>
  )
}

export default Board;
