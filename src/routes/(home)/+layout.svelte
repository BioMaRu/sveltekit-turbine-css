<script lang="ts">
	import Footer from '$components/Footer.svelte';
	import Navbar from '$components/Navbar.svelte';
</script>

<div class="nav-container">
	<Navbar />
</div>

<main>
	<slot />
</main>

<Footer />

<style lang="scss">
	.nav-container {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: 2;
		box-shadow: var(--bsd-200);
	}

	main {
		min-height: calc(100vh - var(--navbar-height));
		padding-top: var(--navbar-height);
	}
</style>
