import { describe, expect, it } from 'vitest';
import { checkBingo } from './bingo-checker';
import type { BoardItem } from './types';

// Helper function to create a board item
function createBoardItem(id: number, pressed: boolean = false): BoardItem {
	const baseItem = {
		id: id.toString(),
		description: `Item ${id}`,
		name: `Item ${id}`,
		preset_id: 'test-preset'
	};

	return {
		...baseItem,
		pressed
	};
}

describe('checkBingo', () => {
	it('should return false for an empty board', () => {
		const boardItems = Array(25)
			.fill(null)
			.map((_, i) => createBoardItem(i));
		const result = checkBingo(boardItems);
		expect(result).toBe(false);
	});

	it('should detect a row bingo', () => {
		const boardItems = Array(25)
			.fill(null)
			.map((_, i) => createBoardItem(i));

		// Press all items in the first row (items 0-4)
		for (let i = 0; i < 5; i++) {
			boardItems[i] = createBoardItem(i, true);
		}

		// Check if pressing the last item in the row causes a bingo
		const result = checkBingo(boardItems);
		expect(result).toBe(true);
	});

	it('should detect a column bingo', () => {
		const boardItems = Array(25)
			.fill(null)
			.map((_, i) => createBoardItem(i));

		// Press all items in the first column (items 0, 5, 10, 15, 20)
		for (let i = 0; i < 25; i += 5) {
			boardItems[i] = createBoardItem(i, true);
		}

		// Check if pressing the last item in the column causes a bingo
		const result = checkBingo(boardItems);
		expect(result).toBe(true);
	});

	it('should detect a diagonal bingo (top-left to bottom-right)', () => {
		const boardItems = Array(25)
			.fill(null)
			.map((_, i) => createBoardItem(i));

		// Press all items in the main diagonal (items 0, 6, 12, 18, 24)
		for (let i = 0; i < 25; i += 6) {
			boardItems[i] = createBoardItem(i, true);
		}

		// Check if pressing the last item in the diagonal causes a bingo
		const result = checkBingo(boardItems);
		expect(result).toBe(true);
	});

	it('should detect a diagonal bingo (top-right to bottom-left)', () => {
		const boardItems = Array(25)
			.fill(null)
			.map((_, i) => createBoardItem(i));

		// Press all items in the secondary diagonal (items 4, 8, 12, 16, 20)
		for (let i = 4; i < 21; i += 4) {
			boardItems[i] = createBoardItem(i, true);
		}

		// Check if pressing the last item in the diagonal causes a bingo
		const result = checkBingo(boardItems);
		expect(result).toBe(true);
	});

	it('should return false when no bingo is present', () => {
		// Create a board with some items pressed, but no complete row, column, or diagonal
		const boardItems = Array(25)
			.fill(null)
			.map((_, i) => createBoardItem(i));

		// Press some random items that don't form any complete row, column, or diagonal
		boardItems[0] = createBoardItem(0, true);
		boardItems[1] = createBoardItem(1, true);
		boardItems[7] = createBoardItem(7, true);
		boardItems[13] = createBoardItem(13, true);
		boardItems[24] = createBoardItem(24, true);

		const result = checkBingo(boardItems);
		expect(result).toBe(false);
	});

	it('should throw error when board items are undefined', () => {
		expect(() => checkBingo(undefined as unknown as BoardItem[])).toThrow(
			'Unable to check for bingo. Board items are undefined.'
		);
	});

	it('should throw error when board items length is not 25', () => {
		const boardItems = Array(24)
			.fill(null)
			.map((_, i) => createBoardItem(i));
		expect(() => checkBingo(boardItems)).toThrow(
			'Unable to check for bingo. Board items is not length 25 (Length: 24)'
		);
	});
});
