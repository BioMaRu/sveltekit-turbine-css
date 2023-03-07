export const ROUTE = {
	home: '/',
	list: '/list'
};

/* these path must auth before enter  */
export const PROTECTED_ROUTES: string[] = [ROUTE.list];

export function isProtectedPath(path: string): boolean {
	return PROTECTED_ROUTES.includes(path);
}
