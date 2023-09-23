import React from 'react';
import { useGame } from '../models/gameContext';
import { checkBlock, checkCol, checkRow } from '../controllers/appController';

export default function CellControls() {
  const {state: {selectedCell, board}, dispatch} = useGame();
  const [toggle, setToggle] = React.useState(true);

  return (
    <div className="cell-inputs">
      <button
        className='cell-input'
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? "Cell" : "Note"}
      </button>
      {[1,2,3,4,5,6,7,8,9].map((item, index) => {
        return (
          <button
            className='cell-input'
            key={index / item}
            onClick={() => {
              if (!selectedCell) return;
              dispatch({
                type: toggle ? 'set' : 'setNote',
                payload: [...selectedCell, item]
              })
              if (!toggle) return;
              dispatch({type: 'blockError', payload: checkBlock(selectedCell[0], selectedCell[1], item, board)});
              dispatch({type: 'rowError', payload: checkRow(selectedCell[0], item, board)});
              dispatch({type: 'colError', payload: checkCol(selectedCell[1], item, board)});
            }}
          >
            {item}
          </button>
        );
      })}
      <button
        className='cell-input'
        onClick={() => {
          const initValue = toggle ? 0 : [0,0,0,0,0,0,0,0,0];
          console.log(initValue);
          dispatch({
            type: toggle ? 'set' : 'setNote',
            payload: [...selectedCell, initValue]
          })
          if (!toggle) return;
          dispatch({ type: 'blockError', payload: ['', ''] });
          dispatch({ type: 'rowError', payload: ['', ''] });
          dispatch({ type: 'colError', payload: ['', ''] });
        }}
      >
        X
      </button>
    </div>
  );
}
