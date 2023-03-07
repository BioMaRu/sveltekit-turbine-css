import { env } from '$env/dynamic/public';

import type { RequestHandler } from './$types';

const endpoint = env.PUBLIC_API_URL;

export const POST: RequestHandler = async ({ locals, getClientAddress, params, request }) => {
	const token = locals.accessToken;
	const fn = params.fn;
	const ct = request.headers.get('content-type') || '';

	const resp = await fetch(`${endpoint}/${fn}`, {
		method: 'POST',
		body: request.body,
		headers: {
			accept: 'application/json',
			'content-type': ct,
			...(token ? { authorization: `bearer ${token}` } : {}),
			'x-client-ip': getClientAddress()
		}
	});

	return new Response(await resp.text(), { status: resp.status });
};

export const GET: RequestHandler = async ({ locals, getClientAddress, params, request }) => {
	const token = locals.accessToken;
	const fn = params.fn;
	const ct = request.headers.get('content-type') || '';

	const resp = await fetch(`${endpoint}/${fn}`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'content-type': ct,
			...(token ? { authorization: `bearer ${token}` } : {}),
			'x-client-ip': getClientAddress()
		}
	});

	return new Response(await resp.text(), { status: resp.status });
};
