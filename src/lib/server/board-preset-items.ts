import { getSupabaseClient } from '$lib/supabase-client';

/**
 * The size of the items per board
 * 5 * 5 = 25
 */
export const BOARD_ITEMS_SIZE = 25;

/**
 * Gets all items of the board and shuffles them using Math.random() via JavaScript.
 *
 * @param boardPresetId
 * @returns Array of 25 board_preset_items as bingo may only contain 25 fields
 */
export async function getShuffledItems(boardPresetId: string) {
	const supabase = getSupabaseClient();

	const { data, error } = await supabase
		.from('board_preset_items')
		.select('name, description')
		.filter('preset_id', 'eq', boardPresetId);

	if (error) {
		throw new Error('Error loading preset items:', {
			cause: error.message
		});
	}

	const shuffledPresets = data
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);

	return shuffledPresets.slice(0, BOARD_ITEMS_SIZE);
}
