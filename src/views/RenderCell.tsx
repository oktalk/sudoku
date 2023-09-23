import React from 'react';
import { useGame } from '../models/gameContext';

export default function RenderCell({cell, rowIndex, colIndex} : {cell: number, rowIndex: number, colIndex: number}) {
  const {state: {selectedCell, blockError, rowError, colError}, dispatch} = useGame();
  const [active, setActive] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!selectedCell) {
      setActive(false);
    } else if (selectedCell.row === rowIndex && selectedCell.col === colIndex) {
      setActive(true);
    } else {
      setActive(false);
    }
    if (
      (blockError.row === rowIndex && blockError.col === colIndex) ||
      (rowError.row === rowIndex && rowError.col === colIndex) ||
      (colError.row === rowIndex && rowError.col === colIndex)
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }, [selectedCell, blockError, rowError, colError, rowIndex, colIndex]);

  return (
    <div className={`cell cell-${rowIndex}-${colIndex} ${active ? 'active' : ''} ${error ? 'error' : ''}`}>
      <input
        type="text"
        value={cell !== 0 ? cell : ''}
        readOnly
        className='value'
        onClick={
          () => {
            dispatch({
              type: 'select',
              payload: {row: rowIndex, col: colIndex}
            })
          }
        }
      />
    </div>
  );
}
