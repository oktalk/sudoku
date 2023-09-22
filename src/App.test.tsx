import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { GameProvider } from './models/game-context';

test('renders whole app', () => {
  render(
    <GameProvider>
      <App />
    </GameProvider>
  );
  const title = screen.getByText(/Sudoku/i);
  expect(title).toBeInTheDocument();
});
