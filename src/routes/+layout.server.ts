import api from '$lib/api';
import type { API } from '$types';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
	if (!locals.accessToken) {
		return {
			me: null
		};
	}

	const res = await api.invokePOST<API.BaseResponse>('user.me', {}, fetch);

	if (!res.ok) {
		return {
			me: null
		};
	}

	locals.me = res?.data?.user;

	return {
		me: locals.me
	};
}) satisfies LayoutServerLoad;
