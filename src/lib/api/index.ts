import { dev } from '$app/environment';
import { invalidate, invalidateAll } from '$app/navigation';

const proxyEndpoint = '/api';

async function _invoke(
	fn: string,
	args: Record<string, unknown>,
	fetch: typeof window.fetch,
	method = 'POST'
) {
	let response;

	try {
		const resp = await fetch(`${proxyEndpoint}/${fn}`, {
			method: method,
			...(method === 'POST' ? { body: JSON.stringify(args) } : {}),
			headers: { 'Content-Type': 'application/json' }
		});
		response = await resp.json();
	} catch (error) {
		return {
			ok: false,
			error: {
				message: 'Call API Error'
			}
		};
	}

	return {
		ok: Boolean(response?.data),
		...response
	};
}

async function invokeGET<T>(fn: string, fetch: typeof window.fetch): Promise<T> {
	const t = Date.now();
	const body = await _invoke(fn, {}, fetch, 'GET');

	if (!body.ok) {
		const msg = body.error?.message || body.error?.detail || '';
		const code = body.error?.code || '';

		console.error(
			`[api] ok=false, fn=${fn}, err_msg=${msg || '{}'}, err_code=${code || ''}, skip_request=${
				body.skip ? 'true' : 'false'
			}`
		);
	}

	if (dev) {
		const d = Date.now() - t;
		console.log(`[api] ok=true, fn=${fn} took ${d}ms`);
	}

	return body;
}

async function invokePOST<T>(
	fn: string,
	args: Record<string, unknown>,
	fetch: typeof window.fetch
): Promise<T> {
	const t = Date.now();
	const body = await _invoke(fn, args || {}, fetch, 'POST');

	if (!body.ok) {
		const msg = body.error?.message || body.error?.detail || '';
		const code = body.error?.code || '';

		console.error(
			`[api] ok=false, fn=${fn}, err_msg=${msg || '{}'}, err_code=${code || ''}, skip_request=${
				body.skip ? 'true' : 'false'
			}`
		);
	}

	if (dev) {
		const d = Date.now() - t;
		console.log(`[api] ok=true, fn=${fn} took ${d}ms`);
	}

	return body;
}

export default {
	invokeGET,
	invokePOST,
	invalidate: async (fn?: string) => {
		if (!fn) {
			return invalidateAll();
		}

		const t = Date.now();
		const p = await invalidate(`${proxyEndpoint}/${fn}`);
		const d = Date.now() - t;
		dev && console.log(`[api] invalidate ${fn} took ${d}ms`);
		return p;
	}
};
