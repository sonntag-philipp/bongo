import { env } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
	// Dynamically create the Supabase client
	const supabaseUrl = env.PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error('Supabase environment variables are not set.');
	}

	if (!supabaseClient) {
		supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
	}

	return supabaseClient;
}
