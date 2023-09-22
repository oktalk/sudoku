import React from 'react'

interface IBoard {
  board: number[][];
  selectedCell: { row: number, cell: number } | null;
  difficulty: string;
  isLoading: boolean;
  serverError: any;
};

type Action =
  {type: 'load', payload?: any} |
  {type: 'set', payload?: any} |
  {type: 'delete', payload?: any} |
  {type: 'select', payload?: any} |
  {type: any, payload?: any}
type Dispatch = (action: Action) => void
type State = IBoard
type GameProviderProps = {children: React.ReactNode}

const initBoard = {
  board: [[1,2,3,4,5,6,7,8,9],[4,5,6,7,8,9,1,2,3],[7,8,9,1,2,3,4,5,6],[2,1,4,3,6,5,8,9,7],[3,6,5,8,9,7,2,1,4],[8,9,7,2,1,4,3,6,5],[5,3,1,6,4,2,9,7,8],[6,4,2,9,7,8,5,3,1],[9,7,8,5,3,1,6,4,2]],
  selectedCell: null,
  difficulty: 'easy',
  isLoading: false,
  serverError: null,
} as IBoard;

const GameContext = React.createContext<{state: State; dispatch: Dispatch} | undefined>(undefined);

function gameReducer(state: State, action: Action) {
  switch (action.type) {
    case 'load': {
      return {
        ...state,
        board: action.payload
      }
    }
    case 'set': {
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
    case 'select': {
      console.log('select', action.payload)
      return {
        ...state,
        selectedCell: action.payload
      };
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
