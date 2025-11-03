import { supabase } from '$lib/supabase-client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const presetId = params['boardId'];

	const { data, error } = await supabase
		.from('preset_items')
		.select('*')
		.filter('preset_id', 'eq', presetId);

	if (error) {
		console.error('Error loading instruments:', error.message);
		return { presetItems: [] };
	}

	return {
		presetItems: data ?? []
	};
};
