import { redirect } from '@sveltejs/kit';

import { dev } from '$app/environment';
import { env as privateEnv } from '$env/dynamic/private';
import { env } from '$env/dynamic/public';

import type { PageServerLoad } from './$types';

export const load = (async ({ url, cookies }) => {
	const params = new URLSearchParams('');
	params.set('callback_url', `${env.PUBLIC_HOSTNAME}/callback`);
	params.set('client_id', env.PUBLIC_AUTH_CLIENT_ID);
	params.set('client_secret', privateEnv.AUTH_CLIENT_SECRET);
	params.set('code', `${url.searchParams.get('code')}`);
	params.set('grant_type', 'authorization_code');

	const resp = await fetch(`${env.PUBLIC_AUTH_URL}/v1/oauth/token?${params.toString()}`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json'
		}
	});
	const res = await resp.json();

	if (!res?.access_token) {
		throw redirect(302, '/');
	}

	cookies.set('access_token', res?.access_token, {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7,
		sameSite: 'lax',
		path: '/',
		secure: !dev
	});

	const redirectURL = atob(`${url.searchParams.get('redirect')}`);

	throw redirect(302, redirectURL ?? '/');
}) satisfies PageServerLoad;
