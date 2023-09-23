import React from 'react';
import { useGame } from '../models/gameContext';
import { checkBoard } from '../controllers/appController';

export default function ControlsUi({ setShowModal } : { setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [toggle, setToggle] = React.useState(false);
  const {state: {board}, dispatch} = useGame()

  return (
    <div className='controls-ui'>
      <button onClick={() => setToggle((prevState) => !prevState)}>Settings</button>
      <div className={`dropdown ${toggle ? 'd-block' : 'hidden'}`}>
        <button
          onClick={() => { dispatch({type: 'reset'}) }}
        >
          Reset
        </button>
        <button onClick={() => {
          console.log('check board', checkBoard(board))
        }}>Check Puzzle</button>
        <button onClick={() => setShowModal(true)}>Load New Puzzle</button>
      </div>
    </div>
  );
}
