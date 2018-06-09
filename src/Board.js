import React from 'react';
import Square from './Square';

class Board extends React.Component {
	renderSquare(i) {
		const winnerClass =
			this.props.winnerSquares &&
			(this.props.winnerSquares[0] === i ||
				this.props.winnerSquares[1] === i ||
				this.props.winnerSquares[2] === i)
				? 'green-background'
				: '';

		return (
			<Square
				key={i.toString()}
				winnerClass={winnerClass}
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}
	createBoard(row, col) {
		const board = [];
		let cellCounter = 0;

		for (let i = 0; i < row; i += 1) {
			const columns = [];
			for (let j = 0; j < col; j += 1) {
				columns.push(this.renderSquare(cellCounter));
				cellCounter += 1;
			}
			board.push(
				<div key={i} className="board-row">
					{columns}
				</div>
			);
		}

		return board;
	}

	render() {
		return <div>{this.createBoard(3, 3)}</div>;
	}
}

export default Board;
