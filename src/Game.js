import React from 'react';
import Board from './Board';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningCombination: lines[i] };
    }
  }
  return false;
};

const showPosition = (number) => {
  const squarePositions = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];
  for (let i = 0; i < squarePositions.length; i += 1) {
    const [row, col] = squarePositions[i];
    if (number === i) {
      return `row ${row} column ${col}`;
    }
  }
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      movesHistory: ['init'],
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const squareID = i;
    const lastPlayer = this.state.xIsNext ? 'X' : '0';
    const movesHistory = this.state.movesHistory.slice(0, this.state.stepNumber + 1);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      movesHistory: movesHistory.concat(`Player ${lastPlayer} played (${showPosition(squareID)})`),
    });
    this.setState({
      history: history.concat([
        {
          squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const movesHistory = this.state.movesHistory;
    const current = history[this.state.stepNumber];
    const { winner, winningCombination } = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const currentMoveClass = move === this.state.stepNumber ? 'bold-text' : '';
      const buttonDescription = move ? `Go to move #${move}` : 'Go to game start';
      const movesDescription = move ? `Move #${move}: ${movesHistory[move]} ` : 'Start playing! ';
      return (
        <li key={move} className={`${currentMoveClass} path-list`}>
          {movesDescription}
          <button className="path-buttons" onClick={() => this.jumpTo(move)}>
            {buttonDescription}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (history.length === 10 && this.state.stepNumber === 9) {
      status = 'It is a draw';
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquares={winningCombination}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status-bar">{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

export default Game;
