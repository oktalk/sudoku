import React from 'react';
import { useGame } from '../models/gameContext';

export default function RenderCell({cell, rowIndex, colIndex} : {cell: number, rowIndex: number, colIndex: number}) {
  const {state: {boardNotes, selectedCell, blockError, rowError, colError}, dispatch} = useGame();
  const [active, setActive] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!selectedCell) {
      setActive(false);
    } else if (selectedCell[0] === rowIndex && selectedCell[1] === colIndex) {
      setActive(true);
    } else {
      setActive(false);
    }
    if (
      (blockError[0] === rowIndex && blockError[1] === colIndex) ||
      (rowError[0] === rowIndex && rowError[1] === colIndex) ||
      (colError[0] === rowIndex && rowError[1] === colIndex)
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }, [selectedCell, blockError, rowError, colError, rowIndex, colIndex]);

  return (
    <div className={`cell cell-${rowIndex}-${colIndex} ${active ? 'active' : ''} ${error ? 'error' : ''}`}>
      <label className='label' htmlFor="cellValue">
        <span className='notes'>
          {boardNotes[rowIndex][colIndex].map((cellNote, index) => (
            <span key={index + (rowIndex*9+colIndex)}>{cellNote !== 0 ? cellNote : ''}</span>
          ))}
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
