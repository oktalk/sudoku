import React from 'react';
import { useGame } from '../models/gameContext';

const boardValidation = (cellError: [number, number][], rowIndex: number, colIndex: number) => {
  return cellError.find((cell) => {
    if (cell[0] === rowIndex && cell[1] === colIndex) {
      return true;
    }
    return false;
  });
}

const cellValidation = (blockError: [number, number], rowError: [number, number], colError: [number, number], rowIndex: number, colIndex: number) => {
  if (
    (blockError[0] === rowIndex && blockError[1] === colIndex) ||
    (rowError[0] === rowIndex && rowError[1] === colIndex) ||
    (colError[0] === rowIndex && colError[1] === colIndex)
  ) {
    return true;
  }
  return false;
}

const cellHighLight = (selectedCell: [number, number], rowIndex: number, colIndex: number) => {
  if (!selectedCell) {
    return false;
  } else if (selectedCell[0] === rowIndex && selectedCell[1] === colIndex) {
    return true;
  }
  return false;
}

export default function RenderCell({cell, rowIndex, colIndex} : {cell: number, rowIndex: number, colIndex: number}) {
  const {state: {boardNotes, selectedCell, blockError, rowError, colError, cellError}, dispatch} = useGame();
  const isActive = cellHighLight(selectedCell, rowIndex, colIndex);
  const inValidBoard = boardValidation(cellError, rowIndex, colIndex);
  const inValidCell = cellValidation(blockError, rowError, colError, rowIndex, colIndex);

  return (
    <div className={`cell cell-${rowIndex}-${colIndex} ${isActive ? 'active' : ''} ${inValidCell ? 'in-valid-cell' : 'valid-cell'} ${inValidBoard ? 'in-valid-board' : 'valid-board'}`}>
      <label className='label' htmlFor="cellValue">
        <span className='notes'>
          {cell === 0 &&
            (boardNotes[rowIndex][colIndex].map((cellNote, index) => (
              <span key={index + (rowIndex*9+colIndex)}>{cellNote !== 0 ? cellNote : ''}</span>
            )))
          }
        </span>
        <input
          type="text"
          name="cellValue"
          value={cell !== 0 ? cell : ''}
          readOnly
          className='value'
          onClick={
            () => {
              dispatch({
                type: 'select',
                payload: [rowIndex, colIndex]
              })
            }
          }
        />
      </label>
    </div>
  );
}
