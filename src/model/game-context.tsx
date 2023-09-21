import React from 'react'

interface IBoard {
  board: number[][];
};

type Action = {type: 'set', payload?: any} | {type: 'delete', payload?: any} | {type: any, payload?: any}
type Dispatch = (action: Action) => void
type State = IBoard
type GameProviderProps = {children: React.ReactNode}

const initBoard = {
  board: [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
  ]
} as IBoard;

const GameContext = React.createContext<{state: State; dispatch: Dispatch} | undefined>(undefined);

function gameReducer(state: State, action: Action) {
  switch (action.type) {
    case 'set': {
      console.log('set', action.payload)
      console.log('state', state)
      const {row, cell, value} = action.payload

      return {
        ...state,
        board: state.board.map((rowArray, rowIndex) => {
          if (rowIndex === row) {
            return rowArray.map((cellValue, cellIndex) => {
              if (cellIndex === cell) {
                return value
              }
              return cellValue
            })
          }
          return rowArray
        })
      }
    }
    case 'delete': {
      console.log('delete', action.payload)
      return state;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = React.useReducer(gameReducer, initBoard)
  const value = {state, dispatch}
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

function useGame() {
  const context = React.useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

export {GameProvider, useGame}
