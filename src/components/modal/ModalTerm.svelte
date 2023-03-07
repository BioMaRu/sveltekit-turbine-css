<script lang="ts">
	import swal from '$lib/swal';

	import Term from './Term.svelte';

	let isActive = false;
	let loading = false;
	let accept = false;

	export function open() {
		accept = false;
		isActive = true;

		document.body.style.overflow = 'hidden';
	}

	function close() {
		if (loading) {
			return;
		}

		isActive = false;
		document.body.style.overflow = 'auto';
	}

	async function submit() {
		if (loading) {
			return;
		}

		loading = true;

		setTimeout(() => {
			loading = false;

			swal.error({
				title: 'ขออภัย',
				text: 'ยังไม่เปิดให้บริการ'
			});
		}, 1000);
	}
</script>

<svelte:window on:modal-term:open={open} />

<div aria-hidden="true" class="trb-modal" class:is-active={isActive} on:click|self={close}>
	<form on:submit|preventDefault={submit} class="trb-modal-panel _pd-0px" style="min-width: 400px;">
		<button type="button" aria-hidden="true" class="trb-modal-close _bdw-0px" on:click|self={close}>
			✕
		</button>

		<div class="_pdl-24px _pdv-24px _pdr-32px">
			<h2 class="_fs-600 _fw-500 _tal-ct">สมัครใช้งาน</h2>
		</div>

		<hr />

		<div class="_pd-24px">
			<div
				class="_bdw-1px _bdcl-neutral-200 _h-100pct _ovf-at _pd-24px _bdrd-12px"
				style="max-height: 30vh;"
			>
				<Term />
			</div>

			<div class="_mgt-24px">
				<div class="trb-field">
					<div class="trb-checkbox">
						<input id="modal-term-accept" type="checkbox" bind:checked={accept} />
						<label for="modal-term-accept"> ยอมรับเงื่อนไขการให้บริการ </label>
					</div>
				</div>
			</div>

			<div class="_mgt-16px">
				<button
					disabled={!accept}
					class="trb-button _w-100pct _bdrd-max"
					class:is-loading={loading}
				>
					สมัครใช้งาน
				</button>
			</div>
		</div>
	</form>
</div>
