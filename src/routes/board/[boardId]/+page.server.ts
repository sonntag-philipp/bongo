import { getSupabaseClient } from '$lib/supabase-client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const presetId = params['boardId'];

	const supabase = getSupabaseClient();

	const { data: presetData, error: presetError } = await supabase
		.from('presets')
		.select('name')
		.eq('id', presetId);

	if (!presetData || presetData?.length <= 0) {
		throw new Error(`Preset not found (Id: "${presetId}")`);
	}

	if (presetError) {
		throw new Error('Error loading preset items:', {
			cause: presetError
		});
	}

	const { data, error } = await supabase
		.from('preset_items')
		.select('*')
		.filter('preset_id', 'eq', presetId);

	if (error) {
		throw new Error('Error loading preset items:', {
			cause: error.message
		});
	}

	const shuffledPresets = data
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);

	return {
		presetItems: shuffledPresets,
		preset: presetData
	};
};
