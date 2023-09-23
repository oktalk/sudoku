import React from 'react';
import { useGame } from '../models/gameContext';
import { checkBlock, checkCol, checkRow } from '../controllers/appController';

export default function CellControls() {
  const {state: {selectedCell, board}, dispatch} = useGame();

  return (
    <div className="cell-inputs">
      {[1,2,3,4,5,6,7,8,9].map((item, index) => {
        return (
          <button
            className='cell-input'
            key={index / item}
            onClick={() => {
              if (!selectedCell) return;
              dispatch({
                type: 'set',
                payload: {...selectedCell, value: item}
              })
              dispatch({type: 'blockError', payload: checkBlock(selectedCell.row, selectedCell.col, item, board)});
              dispatch({type: 'rowError', payload: checkRow(selectedCell.row, item, board)});
              dispatch({type: 'colError', payload: checkCol(selectedCell.col, item, board)});
              console.log('block', checkBlock(selectedCell.row, selectedCell.col, item, board))
              console.log('row', checkRow(selectedCell.row, item, board))
              console.log('col', checkCol(selectedCell.row, item, board))
            }}
          >
            {item}
          </button>
        );
      })}
      <button
        className='cell-input'
        onClick={() => {
          dispatch({
            type: 'set',
            payload: {...selectedCell, value: ''}
          })
          dispatch({ type: 'blockError', payload: { row: null, col: null } });
          dispatch({ type: 'rowError', payload: { row: null, col: null } });
          dispatch({ type: 'colError', payload: { row: null, col: null } });
        }}
      >
        X
      </button>
    </div>
  );
}
