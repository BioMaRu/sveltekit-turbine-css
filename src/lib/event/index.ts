import { browser } from '$app/environment';

export function emit(eventName: string, detail?: object): void {
	if (!browser) {
		return;
	}

	window.dispatchEvent(new CustomEvent(eventName, detail));
}
