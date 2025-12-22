import { getShuffledItems } from '$lib/server/board-preset-items';
import { getItemsBySlug } from '$lib/server/board-presets';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params['slug'];

	const boards = await getItemsBySlug(slug);

	if (!boards || boards?.length <= 0) {
		throw new Error(`Board preset not found (Slug: "${slug}")`);
	}

	if (boards.length > 1) {
		// This should never be the case if the DB is configured correctly.
		throw new Error(`Board slug is not unique (Slug: "${slug}")`);
	}

	const shuffledItems = await getShuffledItems(boards[0].id);

	return {
		boardPresetItems: shuffledItems, // Because at most 25 items
		boardPreset: boards[0]
	};
};
