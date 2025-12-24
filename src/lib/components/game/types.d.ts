import { Database } from '$lib/database.types';

export type BoardItem = Database['public']['Tables']['board_preset_items']['Row'] & {
	pressed: boolean;
};
