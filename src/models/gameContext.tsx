import React from 'react'

interface IBoard {
  currentBoard: number[][];
  board: number[][];
  boardNotes: number[][][];
  selectedCell: [number | any, number | any];
  blockError: [number | any, number | any];
  rowError: [number | any, number | any];
  colError: [number | any, number | any];
  difficulty: string;
  isLoading: boolean;
  serverError: any;
};

type Action =
  {type: 'load', payload?: any} |
  {type: 'reset', payload?: any} |
  {type: 'set', payload?: any} |
  {type: 'setNote', payload?: any} |
  {type: 'delete', payload?: any} |
  {type: 'select', payload?: any} |
  {type: 'cellError', payload?: any} |
  {type: 'cellNote', payload?: any} |
  {type: any, payload?: any}
type Dispatch = (action: Action) => void
type State = IBoard
type GameProviderProps = {children: React.ReactNode}

const initPuzzle = [
  [5,0,7,9,4,0,2,0,8],
  [0,2,0,5,0,8,0,0,0],
  [0,8,0,2,0,7,0,5,0],
  [2,0,4,0,5,0,8,0,0],
  [0,0,8,0,7,0,6,0,4],
  [0,9,0,4,0,2,0,1,0],
  [6,0,0,0,9,0,0,8,0],
  [0,0,0,6,1,0,9,4,0],
  [9,0,0,0,0,3,0,6,1]
];
const note = new Array(9).fill(0);
const cell = new Array(9).fill(note);
const noteRow = new Array(9).fill(cell);

const initBoard = {
  currentBoard: initPuzzle,
  board: initPuzzle,
  boardNotes: noteRow,
  selectedCell: [null, null],
  blockError: [null, null],
  rowError: [null, null],
  colError: [null, null],
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
        currentBoard: action.payload.board,
        board: action.payload.board
      }
    }
    case 'reset': {
      return {
        ...state,
        board: state.currentBoard,
        selectedCell: initBoard.selectedCell,
        blockError: initBoard.blockError,
        rowError: initBoard.rowError,
        colError: initBoard.colError,
      }
    }
    case 'set': {
      const [row, col, value] = action.payload
      return {
        ...state,
        board: state.board.map((rowArray, rowIndex) => {
          if (rowIndex === row) {
            return rowArray.map((cellValue, colIndex) => {
              if (colIndex === col) {
                return value
              }
              return cellValue
            })
          }
          return rowArray
        })
      }
    }
    case 'setNote': {
      const [row, col, value] = action.payload
      return {
        ...state,
        boardNotes: state.boardNotes.map((rowArray, rowIndex) => {
          if (rowIndex === row) {
            return rowArray.map((cellValue, colIndex) => {
              if (colIndex === col) {
                if (typeof value === 'object') return value;
                if (cellValue.includes(value)) {
                  return cellValue.map((note) => note === value ? 0 : note)
                }
                return cellValue.map((note, index) => index === value - 1 ? value : note)
              }
              return cellValue
            })
          }
          return rowArray
        })
      }
    }
    case 'select': {
      return {
        ...state,
        selectedCell: action.payload
      };
    }
    case 'blockError': {
      return {
        ...state,
        blockError: action.payload
      };
    }
    case 'rowError': {
      return {
        ...state,
        rowError: action.payload
      };
    }
    case 'colError': {
      return {
        ...state,
        colError: action.payload
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
