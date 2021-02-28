export const initialState = (rowSize = 3) => {
  const maxPlays = rowSize ** 2;
  return {
    X: null,
    O: null,
    winner: null,
    maxPlays,
    board: new Array(maxPlays).fill(''),
    symbols: Object.freeze(['X', 'O']),
    currentSymbol: 'X',
    plays: 0,
  };
};
export const computeNewBoard = ({ board, currentSymbol, squareIndex }) => board
  .map((symbol, i) => (
    squareIndex === i
      ? currentSymbol
      : symbol
  ));

export const computeNewSymbol = ({ plays, symbols }) => symbols[plays % symbols.length];

export const canFill = ({
  board,
  squareIndex,
  winner,
  X,
  O,
  currentSymbol,
  player,
}) => (X && O && board[squareIndex] === '' && !winner && (currentSymbol === player));

export const checkSquaresForWinner = (squares) => {
  const targetSymbol = squares[0];
  if (squares.every((symbol) => symbol === targetSymbol)) {
    return targetSymbol;
  }
  return false;
};

export const getRowSize = (board) => Math.sqrt(board.length);

export const getColumn = (squareIndex, board) => squareIndex % getRowSize(board);

export const getRow = (squareIndex, board) => Math.floor(squareIndex / getRowSize(board));

export const checkColumnForWinner = (board, column) => {
  const squares = board.filter((_, i) => getColumn(i, board) === column);
  return checkSquaresForWinner(squares);
};

export const checkRowForWinner = (board, row) => {
  const squares = board.filter((_, i) => getRow(i, board) === row);
  return checkSquaresForWinner(squares);
};

export const getDescendingDiagonalSquares = (board) => {
  const isDescendingDiagonalSquare = (_, i) => {
    const row = getRow(i, board);
    const column = getColumn(i, board);
    return row === column;
  };
  return board.filter(isDescendingDiagonalSquare);
};

export const getAscendingDiagonalSquares = (board) => {
  const rowSize = getRowSize(board);
  const isAscendingDiagonalSquare = (_, i) => {
    const row = getRow(i, board);
    const column = getColumn(i, board);
    return row + column === rowSize - 1;
  };

  return board.filter(isAscendingDiagonalSquare);
};

export const checkDiagonalsForWinner = (board) => {
  const descendingDiagonalSquares = getDescendingDiagonalSquares(board);
  const ascendingDiagonalSquares = getAscendingDiagonalSquares(board);

  return checkSquaresForWinner(descendingDiagonalSquares)
  || checkSquaresForWinner(ascendingDiagonalSquares);
};

export const computeWinner = ({ board, squareIndex }) => {
  const column = getColumn(squareIndex, board);
  const row = getRow(squareIndex, board);
  const winner = checkColumnForWinner(board, column)
              || checkRowForWinner(board, row)
              || checkDiagonalsForWinner(board);

  return winner || null;
};

export const join = (state, symbol, name) => {
  if (!state[symbol]) {
    return {
      ...state,
      [symbol]: name,
    };
  }
  return state;
};
export const computeNewState = (state, squareIndex, player) => {
  if (!canFill({ ...state, squareIndex, player })) {
    return state;
  }

  const board = computeNewBoard({ ...state, squareIndex });
  const plays = state.plays + 1;
  const currentSymbol = computeNewSymbol({
    ...state,
    plays,
  });

  const winner = computeWinner({
    board,
    squareIndex,
  });

  return {
    ...state,
    board,
    plays,
    winner,
    currentSymbol,
  };
};
