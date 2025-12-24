import type { BoardItem } from './types';

export function checkBingo(boardItems: BoardItem[] | undefined) {
	if (!boardItems) {
		throw new Error('Unable to check for bingo. Board items are undefined.');
	}

	if (boardItems.length !== 25) {
		throw new Error(
			`Unable to check for bingo. Board items is not length 25 (Length: ${boardItems.length})`
		);
	}

	// Create 5x5 board
	const board = [
		boardItems.slice(0, 5),
		boardItems.slice(5, 10),
		boardItems.slice(10, 15),
		boardItems.slice(15, 20),
		boardItems.slice(20, 25)
	];

	// Check if the updated item caused a bingo
	return checkRowBingo(board) || checkColumnBingo(board) || checkDiagonalBingo(board);
}

/**
 * Check if a specific row has all items pressed
 * @param board The 5x5 bingo board
 * @param row The row index to check
 * @returns True if the row has a bingo, false otherwise
 */
function checkRowBingo(board: BoardItem[][]): boolean {
	for (const row of board) {
		if (row.every((item) => item.pressed)) {
			return true;
		}
	}
	return false;
}

/**
 * Check if a specific column has all items pressed
 * @param board The 5x5 bingo board
 * @param col The column index to check
 * @returns True if the column has a bingo, false otherwise
 */
function checkColumnBingo(board: BoardItem[][]): boolean {
	for (let col = 0; col < 5; col++) {
		if (board.every((row) => row[col].pressed)) {
			return true;
		}
	}
	return false;
}

/**
 * Check if either diagonal has all items pressed
 * @param board The 5x5 bingo board
 * @returns True if either diagonal has a bingo, false otherwise
 */
function checkDiagonalBingo(board: BoardItem[][]): boolean {
	const diagonal1 =
		board[0][0].pressed &&
		board[1][1].pressed &&
		board[2][2].pressed &&
		board[3][3].pressed &&
		board[4][4].pressed;

	const diagonal2 =
		board[0][4].pressed &&
		board[1][3].pressed &&
		board[2][2].pressed &&
		board[3][1].pressed &&
		board[4][0].pressed;

	return diagonal1 || diagonal2;
}
