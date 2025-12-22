import { getSupabaseClient } from '$lib/supabase-client';

export async function getItemsBySlug(boardPresetSlug: string) {
	const supabase = getSupabaseClient();

	const { data: presetData, error: presetError } = await supabase
		.from('board_presets')
		.select('name, description, id')
		.eq('slug', boardPresetSlug);

	if (presetError) {
		throw new Error('Error loading preset items:', {
			cause: presetError
		});
	}

	return presetData;
}
