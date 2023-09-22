import React from 'react';
import { useGame } from '../models/game-context';

export default function RenderCell({cell, rowIndex, cellIndex} : {cell: number, rowIndex: number, cellIndex: number}) {
  const {state: {selectedCell}, dispatch} = useGame();
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (!selectedCell) {
      setActive(false);
    } else if (selectedCell.row === rowIndex && selectedCell.cell === cellIndex) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [selectedCell]);

  return (
    <div className={`cell cell-${rowIndex}-${cellIndex} ${active ? 'active' : ''}`}>
      <input
        type="text"
        value={cell}
        readOnly
        className='value'
        onClick={
          () => {
            dispatch({
              type: 'select',
              payload: {row: rowIndex, cell: cellIndex}
            })
          }
        }
      />
    </div>
  );
}
