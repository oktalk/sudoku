import React from 'react';
import { createPortal } from 'react-dom';
import RenderBoard from './views/RenderBoard';
import CellControls from './views/CellControls';
import ControlsUi from './views/ControlsUi';
import NewGame from './views/NewGame';
import './App.css';

function App() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="App">
      <div className='header'>
        <h1>Sudoku</h1>
        <ControlsUi setShowModal={setShowModal} />
      </div>
      <RenderBoard />
      <CellControls />
      {showModal && createPortal(<NewGame setShowModal={setShowModal} />, document.body)}
    </div>
  );
}

export default App;
