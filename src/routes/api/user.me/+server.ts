import cookie from 'cookie';

import { env } from '$env/dynamic/public';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, fetch }) => {
	const token = locals.accessToken;

	if (!token) {
		return new Response(
			JSON.stringify({
				ok: false,
				skip: true,
				error: {
					message: 'No access token'
				}
			})
		);
	}

	const resp = await fetch(`${env.PUBLIC_GRAPHQL_URL}`, {
		method: 'POST',
		body: JSON.stringify({
			query: `query {
                user {
                    id
                    image
                    created_at
                    display_name
                    email
                    username
                }
            }`
		}),
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			authorization: `bearer ${token}`
		}
	});

	const text = await resp.text();

	let canGetMe = true;
	try {
		const r = JSON.parse(text);
		canGetMe = !!r.data;
	} catch (error) {
		canGetMe = false;
	}

	return new Response(text, {
		status: resp.status,
		headers: {
			'set-cookie': !canGetMe
				? cookie.serialize('access_token', '', {
						httpOnly: true,
						sameSite: 'lax',
						path: '/',
						expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') // use for clear cookie
				  })
				: ''
		}
	});
};
