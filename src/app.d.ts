// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from '$types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			accessToken: string;
			me: User.Me | null | undefined;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
