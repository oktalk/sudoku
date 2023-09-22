import React from 'react';
import { useGame } from '../models/game-context';
import { checkBoard } from '../controllers/app-controller';

export default function ControlsUi({ setShowModal } : { setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [toggle, setToggle] = React.useState(false);
  const {state: {board}} = useGame()

  return (
    <div className='controls-ui'>
      <button onClick={() => setToggle((prevState) => !prevState)}>Settings</button>
      <div className={`dropdown ${toggle ? 'd-block' : 'hidden'}`}>
        <button onClick={() => false}>Reset</button>
        <button onClick={() => {
          console.log('check board', checkBoard(board))
        }}>Check Puzzle</button>
        <button onClick={() => setShowModal(true)}>Load New Puzzle</button>
      </div>
    </div>
  );
}
