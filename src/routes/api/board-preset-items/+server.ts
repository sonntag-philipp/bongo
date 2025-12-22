import { getShuffledItems } from '$lib/server/board-preset-items';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	// Extract the preset_id parameter from the URL
	const presetId = url.searchParams.get('preset_id');

	if (!presetId) {
		return new Response(
			JSON.stringify({
				error: 'Missing required parameter: preset_id'
			}),
			{
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}

	try {
		const data = await getShuffledItems(presetId);

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		if (error instanceof Error) {
			return new Response(
				JSON.stringify({
					error: error.message
				}),
				{
					status: 404,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		return new Response(
			JSON.stringify({
				error: 'An unknown error occurred'
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
};
