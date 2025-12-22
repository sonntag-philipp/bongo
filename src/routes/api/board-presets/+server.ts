import { getItemsBySlug } from '$lib/server/board-presets';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	// Extract the slug parameter from the URL
	const slug = url.searchParams.get('slug');

	if (!slug) {
		return new Response(
			JSON.stringify({
				error: 'Missing required parameter: slug'
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
		const data = await getItemsBySlug(slug);

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
