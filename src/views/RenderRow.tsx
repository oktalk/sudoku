import React from 'react';
import RenderCell from './RenderCell';

// function to render a sudoku row from the row array
export default function RenderRow({ row, rowIndex }: { row: number[]; rowIndex: number }) {
  return (
    <div className='row'>
      {row.map((cell, colIndex) => <RenderCell key={rowIndex*9+colIndex} cell={cell} rowIndex={rowIndex} colIndex={colIndex} />)}
    </div>
  );
}
