import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import cookie from 'cookie';

import { dev } from '$app/environment';
import { getAuthURL } from '$lib/auth';
import { isProtectedPath } from '$lib/routes';

const handleAuth = (async ({ event, resolve }) => {
	const { request, locals, url } = event;
	const cs = cookie.parse(request.headers.get('cookie') ?? '');
	locals.accessToken = cs.access_token;

	if (isProtectedPath(url.pathname)) {
		if (!locals.accessToken) {
			return Response.redirect(getAuthURL(url), 302);
		}
	}

	return await resolve(event);
}) satisfies Handle;

const handleLog = (async ({ event, resolve }) => {
	const { url } = event;

	if (url.pathname.startsWith('/api/')) {
		dev && console.log(`handle API: ${url.pathname}`);
	} else if (isProtectedPath(url.pathname)) {
		dev && console.log(`handle protected route: ${url.pathname}`);
	} else {
		dev && console.log(`handle route: ${url.pathname}`);
	}

	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(handleLog, handleAuth);
