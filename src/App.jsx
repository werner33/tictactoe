import {useEffect, useState} from 'react';

import './App.css'

function App() {

  const [isTurnOfX, setIsTurnOfX] = useState(false);
  const [winner, setWinner] = useState(false);
  const [draw, setDraw] = useState(false);
  const [board, setBoard] = useState([
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ])

  // improvements
    // make each box its own component
    // keep track of how many times x or o have won
    // make the board dynamic so it can be 4x4 or nxn (any number)
      // score m (some number smaller than n) consecutive X's or O's
    // add some beautiful styling (make your own or go find a design)
    // add a header and footer
    // add router
      // add a about page
      // put another game on a different page

  // advanced improvements 
      // make it multiplayer on separate browsers
      // introduce an AI for the computer player
  
  // other games like this
    // hangman
    // connect four
    // boxes
    // minesweeper (advanced)

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
    // show draw state in DOM
  // state for has a winner 
    // if true you cant click any more boxes

  const selectBox = (e) => {
    
    // get the id, which contains the row and column
    const selectedBoxId = e.target.id;
    const row = Number(selectedBoxId.split('x')[0]);
    const column = Number(selectedBoxId.split('x')[1]);

    // what needs to be true about the click? to update the board
    if(winner || typeof board[row][column] === 'string'){
      // do nothing
      return;
    }

    setBoard((board) => {
      // copy of the board
      const tempBoard = board.map(row => row.slice());
      tempBoard[row][column] = isTurnOfX ? 'X' : 'O';

      return tempBoard;
    });
  }

  useEffect(() => {
    const characterToCheck = isTurnOfX ? 'X' : 'O';
    const hasWinner = checkForWinner(board, characterToCheck)
    // update state with a winner
    if(hasWinner){
      setWinner(characterToCheck); // 'X', 'O'
    } else {
      // check for draw
      // flatten the matrix and count how many zeros
      const flatBoard = board.flat();
      const countOfZeros = flatBoard.filter(el => el === 0).length;
      if(countOfZeros === 0) setDraw(true);
    }

    setIsTurnOfX(!isTurnOfX);
  }, [board])


  function checkForWinner (board, char) {
    // first row
    if(board[0].every(el => el === char)){
      return true;
    }
    // second row
    if(board[1].every(el => el === char )){
      return true;
    }
    // third row
    if(board[2].every(el => el === char )){
      return true;
    }
  
    // columns
    if(board[0][0] === char && board[0][0] === board[1][0] && board[1][0] === board[2][0]){
      return true;
    }
    if(board[0][1] === char && board[0][1] === board[1][1] && board[1][1] === board[2][1]){
      return true;
    }

    if(board[0][2] === char && board[0][2] === board[1][2] && board[1][2] === board[2][2]){
      return true;
    }
  
    // top left to bottom right
    if(board[0][0] === char && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
      return true;
    }
    // top right to bottom left
    if(board[0][2] === char && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
      return true;
    }
  
    return false;
  }

  const resetBoard = () => {
    setBoard([
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ]);
    setIsTurnOfX(false);
    setWinner(false);
    setDraw(false);
  }

  return (
    <div className="app">
      {winner && <div>Winner: winner</div>}
      {draw && <div>Your game ended in a draw!</div>}
      <div className="reset-button" onClick={resetBoard}>Reset</div>
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

export default App
