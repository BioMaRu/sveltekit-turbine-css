<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import api from '$lib/api';
	import { ROUTE } from '$lib/routes';
	import toast from '$lib/toast';
	import type { API } from '$types';
	const menus = [
		{
			href: ROUTE.list,
			label: 'List page',
			iconClass: 'fa-light fa-circle-star _fs-700'
		}
	] as const;

	const dispatch = createEventDispatcher();

	async function logout() {
		api
			.invokePOST<API.BaseResponse>('auth.logout', {}, fetch)
			.then(async (res) => {
				if (!res.ok) {
					toast.error('ออกจากระบบไม่สำเร็จ');
					return;
				}

				window.location.href = ROUTE.home;
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}

	function clickMenu() {
		dispatch('click-menu');
	}
</script>

<div class="navbar-menu-panel">
	<div class="u-valign-center _gg-12px">
		<div>
			<img
				src={$page.data.me?.image}
				alt={'Me'}
				class="_w-48px _h-48px _bdrd-max _ojpst-ct _bdw-1px _bdcl-neutral-200"
			/>
		</div>
		<div class="lo-12 _gg-4px">
			<div class="_fw-600 _fs-300">{$page.data.me?.display_name}</div>
			<div class="_fs-200 _cl-text-default-200">
				{$page.data.me?.email}
			</div>
		</div>
	</div>

	<hr class="_mgt-16px" />

	<div class="lo-12 _mgt-12px">
		{#each menus as menu}
			<a
				on:click={clickMenu}
				href={menu.href}
				class="menu-item _dp-f _alit-ct _gg-24px _pdh-12px _bdrd-8px _cs-pt"
				style="min-height: 50px;"
			>
				<div class="_w-24px _h-24px u-align-middle">
					<i class={menu.iconClass} />
				</div>
				<div class="_ffml-secondary">{menu.label}</div>
			</a>
		{/each}

		<hr class="_mgv-8px" />

		<button
			on:click={clickMenu}
			class="menu-item _dp-f _alit-ct _gg-24px _pdh-12px _bdrd-8px _cs-pt _cl-negative-200"
			style="min-height: 50px;"
			on:click={() => logout()}
		>
			<div class="_w-24px _h-24px u-align-middle">
				<i class="fa-light fa-right-from-bracket _fs-700" />
			</div>
			<div class="_ffml-secondary">ออกจากระบบ</div>
		</button>
	</div>
</div>

<style lang="scss">
	.navbar-menu-panel {
		width: inherit;
		max-width: inherit;
		padding: 24px;
		border: 1px solid var(--color-neutral-200);
		border-radius: 8px;
		background-color: var(--color-white-100);
		box-shadow: var(--bsd-300);
	}

	.menu-item {
		border: none;
		background: transparent;
		transition: all 0.12s ease-in-out;

		&:hover {
			background-color: var(--color-neutral-100);
		}
	}
</style>
