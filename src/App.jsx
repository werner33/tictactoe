import {useState} from 'react';

import './App.css'

function App() {

  const [isTurnOfX, setIsTurnOfX] = useState(true);
  const [board, setBoard] = useState([
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ])

  // 9x9 board
    // single square
      // can be blank, x or o
      // can be clicked only once per game
  // reset button 
  // after each new box is clikced
    // check for winner
      // row
      // column
      // diagonal
    // check for draw
  // state for has a winner
    // if true you cant click any more boxes


  // add an on click event
   // how will we know if 'x' or 'o' is clicking?

  const selectBox = (e) => {
    
    // get the id, which contains the row and column
    const selectedBoxId = e.target.id;
    const row = Number(selectedBoxId.split('x')[0]);
    const column = Number(selectedBoxId.split('x')[1]);

    // what needs to be truw about the click? to update the board
    if(typeof board[row][column] === 'string'){
      // do nothing
      return;
    }

    // update the state
    setBoard(board => {
      // if x, set to x
      if(isTurnOfX){
        board[row][column] = 'X';
      } else {
        // else set to O
        board[row][column] = 'O';
      }
      //update the turn to the opposite of whoever slected last
      setIsTurnOfX(!isTurnOfX);

      // return the updated board
      return board;
    });

    console.log(board);    
  }

  return (
    <div className="app">
      <div className="board">
        {board.map((row, rowIndex) => {
           return row.map((selection, index) => {
            return (
              <div 
              className="box"
              onClick={selectBox}
              id={`${rowIndex}x${index}`} 
              key={index}
            >
              {typeof selection === 'string' && selection}
            </div>
            )
          })
        })}
      </div>
    </div>
  )
}

// 0 * 3 + 1
// 0 * 3 + 2
// 0 * 3 + 3
// 1 * 3 + 1 = 4
// 1 * 3 + 2 = 5
// 1 * 3 + 3 = 6

export default App
