<script lang="ts">
	import '@fontsource/kanit/400.css';
	import '@fontsource/kanit/500.css';
	import '@fontsource/kanit/600.css';
	import '$style/main.scss';

	import { SvelteToast } from '@zerodevx/svelte-toast';

	import ModalTerm from '$components/modal/ModalTerm.svelte';
</script>

<slot />

<ModalTerm />

<SvelteToast />

<style>
	:root {
		--navbar-height: 72px;
	}
</style>
