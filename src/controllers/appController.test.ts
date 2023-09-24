import { checkRow, checkCol, checkBlock, checkBoard } from './appController';

describe('validate board', () => {
  let board: number[][];
  let solution: number[][];
  beforeEach(() => {
    board = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
    ];
    solution = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

  });
  test('check a row for 8, value should not be present', () => {
    expect(checkRow(3, 8, board)).toBe(false)
  });
  test('check a row for 8, value should be present', () => {
    board[3][3] = 8;
    expect(checkRow(3, 8, board)).toEqual([3, 3])
  });
  test('check column for 8, value should not be present', () => {
    expect(checkCol(3, 8, board)).toBe(false);
  });
  test('check column for 8, value should be present', () => {
    board[3][3] = 8;
    expect(checkCol(3, 8, board)).toEqual([3, 3]);
  });
  test('check block for 8, value should not be present', () => {
    expect(checkBlock(3, 3, 8, board)).toBe(false);
  });
  test('check block for 8, value should be present', () => {
    board[5][4] = 8;
    expect(checkBlock(3, 3, 8, board)).toEqual([5, 4]);
  });
  test('check board, if valid return true', () => {
    board = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];
    expect(checkBoard(board, solution)).toEqual([]);
  });
  test('check board, if invalid return cell location', () => {
    board = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 0, 3, 4, 8],
      [1, 0, 0, 3, 4, 2, 5, 6, 0],
      [8, 5, 9, 7, 6, 1, 0, 2, 0],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 0, 1, 5, 3, 7, 2, 1, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 0, 0, 4, 8, 1, 1, 7, 9]
    ];
    expect(checkBoard(board, solution)).toEqual([[6, 7], [8, 3], [8, 5]]);
  });
});
