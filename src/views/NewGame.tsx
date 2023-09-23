import React from 'react';
import { useGame } from '../models/gameContext';

export default function ControlsUi({ setShowModal } : { setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) {
  const {dispatch} = useGame();
  const [isLoading, setIsLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState();

  const fetchData = async (difficulty: string) => {
    setIsLoading(true);
    try {
      const data = await (await fetch(`https://sugoku.onrender.com/board?difficulty=${difficulty}`)).json();
      dispatch({
        type: 'load',
        payload: data
      });
      dispatch({ type: 'reset' });
      setIsLoading(false);
    } catch (err: any) {
      setServerError(err);
      setIsLoading(false);
    }
  };

  return (
    <div className='overlay'>
      <div className='overlay-container'>
        <div className='overlay-header'>
          <button onClick={() => setShowModal(false)}>Back</button>
        </div>
        <div className='overlay-body'>
          <button onClick={() => fetchData('easy')}>Easy</button>
          <button onClick={() => fetchData('medium')}>Medium</button>
          <button onClick={() => fetchData('hard')}>Hard</button>
          {serverError && <div>Server Error</div>}
        </div>
      </div>
      <div className={`overlay-loading ${isLoading ? "active" : ""}`}>
        <div className="lds-ripple"><div></div><div></div></div>
      </div>
    </div>
  );
}
