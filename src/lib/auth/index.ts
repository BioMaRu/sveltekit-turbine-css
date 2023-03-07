import { env } from '$env/dynamic/public';

export function getAuthURL(
	url: Partial<{
		href: string;
		host: string;
		protocol: string;
	}>
): string {
	const host = `${url.protocol}//${url.host}`;
	const redirectPath = `${url.href}`;
	const callbackUrl = `${host}/callback?redirect=${btoa(encodeURI(redirectPath))}`;

	return `${env.PUBLIC_AUTH_URL}/oauth/authorize?client_id=${env.PUBLIC_AUTH_CLIENT_ID}&response_type=code&callback_url=${callbackUrl}`;
}
