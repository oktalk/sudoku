import React from 'react';
import { useGame } from '../models/game-context';
import RenderBlocks from './RenderBlocks';

// function to render a sudoku board form the board array
export default function RenderBoard() {
  const {state: {board}} = useGame()
  return (
    <div className='game-board grid'>
      {board.map((row, rowIndex) => <RenderBlocks key={rowIndex} row={row} rowIndex={rowIndex} />)}
    </div>
  );
}
