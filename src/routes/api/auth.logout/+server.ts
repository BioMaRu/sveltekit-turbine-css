import cookie from 'cookie';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
	return new Response(
		JSON.stringify({
			ok: true
		}),
		{
			status: 200,
			headers: {
				'set-cookie': cookie.serialize('access_token', '', {
					httpOnly: true,
					sameSite: 'lax',
					path: '/',
					expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT')
				})
			}
		}
	);
};
