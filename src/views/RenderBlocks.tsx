import React from 'react';
import RenderCell from './RenderCell';

// function to render a sudoku row from the row array
export default function RenderBlocks({ row, rowIndex }: { row: number[]; rowIndex: number }) {
  return (
    <div className='block grid'>
      {row.map((cell, cellIndex) => <RenderCell key={rowIndex*9+cellIndex} cell={cell} rowIndex={rowIndex} cellIndex={cellIndex} />)}
    </div>
  );
}
