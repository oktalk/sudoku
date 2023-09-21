// function compares three arrays to see if the given value is present in any of them
// checkCellValue({row: 3, col: 3, block: 1, value: 8}, board)
// returns true

export function checkRow(row: number, value: number, board: number[][]) {
  // loop over the row and check if the value is present
  // if the value is present, return the row and col of the matched index
  // if the value is not present, return false
  for (let i = 0; i < board[row].length; i++) {
    if (board[row][i] === value) {
      return { row: row, col: i };
    }
  }
  return false;
}

export function checkCol(col: number, value: number, board: number[][]) {
  // loop over the col and check if the value is present
  // if the value is present, return the row and col of the matched index
  // if the value is not present, return false
  for (let i = 0; i < board.length; i++) {
    if (board[i][col] === value) {
      return { row: i, col: col };
    }
  }
  return false;
}

export function checkBlock(row: number, col: number, value: number, board: number[][]) {
  // loop over the block and check if the value is present
  // if the value is present, return the row and col of the matched index
  // if the value is not present, return false
  const startRow = row - (row % 3), startCol = col - (col % 3);
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === value) {
        return { row: i, col: j };
      }
    }
  }
  return false;
}

export function checkBoard(board: number[][]) {
  // check every index on the board to see if the value is present
  // if any value is === 0 return false;
  // if all values are !== 0 return check block, row, and col
  // if any of the checks return false, return false
  // else return true
  for (let i = 0; i < board.length; i++) {
    if (board[i].includes(0)) {
      return false;
    }
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = board[i][j];
      if (!checkRow(i, value, board) || !checkCol(j, value, board) || !checkBlock(i, j, value, board)) {
        return false;
      }
    }
  }
  return true;
}
