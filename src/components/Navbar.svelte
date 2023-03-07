<script lang="ts">
	import { cubicInOut } from 'svelte/easing';

	import { page } from '$app/stores';
	import NavbarMenuPanel from '$components/NavbarMenuPanel.svelte';
	import { getAuthURL } from '$lib/auth';
	import clickAway from '$lib/use-action/clickAway';

	let showMenu = false;
	const menuTransition = (_: Element) => {
		return {
			css: (t: number) => {
				const eased = cubicInOut(t);
				return `
                    transform: translateY(${12 * eased - 12}px);
                    opacity: ${eased};
                `;
			},
			duration: 160
		};
	};
</script>

<nav>
	<div class="_pdh-24px _w-100pct _h-100pct _dp-f _jtfct-spbtw _alit-ct">
		<a href="/">
			<img src="/images/fw-logo-color.svg" alt="Fastwork" height="30" width="192" />
		</a>
		<div class="u-halign-center u-valign-center _gg-24px">
			{#if !$page.data.me}
				<button
					class="trb-button _pdh-24px _bdrd-max"
					on:click={() => (window.location.href = getAuthURL($page.url))}
				>
					เข้าสู่ระบบ
				</button>
			{:else}
				<button
					on:click={() => (showMenu = !showMenu)}
					class="nm-button is-variant-secondary menu-button _bdw-1px _bdcl-neutral-200 _dp-f _alit-ct _gg-8px _cs-pt"
				>
					<div class="_fw-700 _fs-300">บัญชีของฉัน</div>
					<img src={$page.data.me.image} alt={'Me'} class="_w-32px _h-32px _bdrd-max _ojpst-ct" />
				</button>
			{/if}
		</div>
	</div>
</nav>

{#if showMenu}
	<div
		transition:menuTransition
		class="navbar-menu"
		use:clickAway
		on:click-away={() => (showMenu = false)}
	>
		<NavbarMenuPanel on:click-menu={() => (showMenu = false)} />
	</div>
{/if}

<style lang="scss">
	nav {
		height: var(--navbar-height);
		background: var(--color-white-100);
	}

	.menu-button {
		padding: 6px 16px;
		border-radius: 6px;
		background: white;
		cursor: pointer;
		transition: all 0.12s ease-in-out;

		&:hover {
			background: var(--color-neutral-100);
		}
	}

	.navbar-menu {
		position: absolute;
		top: calc(var(--navbar-height) - 8px);
		right: 24px;
		z-index: 2;
		width: 100%;
		max-width: 320px;
	}
</style>
