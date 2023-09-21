import React from 'react';
import { useGame } from './model/game-context';
import './App.css';

// function to render a sudoku cell from the cell value
function RenderCell({cell, rowIndex, cellIndex} : {cell: number, rowIndex: number, cellIndex: number}) {
  const {dispatch} = useGame()
  return (
    <div className={`cell cell-${rowIndex}-${cellIndex}`}>
      <input
        type="text"
        value={cell}
        className='input'
        onChange={
          (e) => {
            dispatch({
              type: 'set',
              payload: {row: rowIndex, cell: cellIndex, value: e.target.value}
            })
          }
        }
      />
    </div>
  );
}

// function to render a sudoku row from the row array
function RenderBlocks({ row, rowIndex }: { row: number[]; rowIndex: number }) {
  return (
    <div className='block grid'>
      {row.map((cell, cellIndex) => <RenderCell key={rowIndex*9+cellIndex} cell={cell} rowIndex={rowIndex} cellIndex={cellIndex} />)}
    </div>
  );
}

// function to render a sudoku board form the board array
function RenderBoard() {
  const {state: {board}} = useGame()
  console.log('board', board);
  return (
    <div className='game-board grid'>
      {board.map((row, rowIndex) => <RenderBlocks key={rowIndex} row={row} rowIndex={rowIndex} />)}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div>
        <h1>Sudoku</h1>
      </div>
      <RenderBoard />
    </div>
  );
}

export default App;
