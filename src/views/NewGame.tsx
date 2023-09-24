import React from 'react';
import { useGame } from '../models/gameContext';
import Sudoku from '../controllers/generator';

let sudoku = (N: number, K: number) => new Sudoku(N, K);

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
          <button onClick={() => {
            dispatch({
              type: 'load',
              payload: sudoku(9, 27).fillValues()
            });
            dispatch({ type: 'reset' });
          }}>Easy</button>
          <button onClick={() => {
            dispatch({
              type: 'load',
              payload: sudoku(9, 36).fillValues()
            });
            dispatch({ type: 'reset' });
          }}>Medium</button>
          <button onClick={() => {
            dispatch({
              type: 'load',
              payload: sudoku(9, 49).fillValues()
            });
            dispatch({ type: 'reset' });
          }}>Hard</button>
          {serverError && <div>Server Error</div>}
        </div>
      </div>
      <div className={`overlay-loading ${isLoading ? "active" : ""}`}>
        <div className="lds-ripple"><div></div><div></div></div>
      </div>
    </div>
  );
}
