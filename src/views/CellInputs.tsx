import React from 'react';
import { useGame } from '../models/game-context';

export default function CellInputs() {
  const {state: {selectedCell}, dispatch} = useGame();
  return (
    <div className="cell-inputs">
      {[1,2,3,4,5,6,7,8,9].map((item, index) => {
        return (
          <button
            className='cell-input'
            key={index / item}
            onClick={() => {
              dispatch({
                type: 'set',
                payload: {...selectedCell, value: item}
              })
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
        }}
      >
        X
      </button>
    </div>
  );
}
