<script lang="ts">
	import { AppShell, AppBar, Drawer, setInitialClassState } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { MenuIcon } from 'svelte-feather-icons';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Components/Navigation.svelte';
	import '../app.post.css';
	import '../theme.post.css';
	import { onMount } from 'svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	initializeStores();

	const drawerStore = getDrawerStore();

	const handleClick = () => {
		drawerStore.open();
	};

	onMount(() => {
		String(setInitialClassState());
	});
</script>

<Drawer width="w-1/2 md:w-1/4">
	<Navigation />
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">
				<button
					on:click={handleClick}
					aria-label="Open Drawer Menu"
					title="Open Drawer Menu"
				>
					<MenuIcon size="32" />
				</button>
			</svelte:fragment>
			<a
				href="/"
				class="h3 italic"
			>
				Pointer Of
			</a>
			<!-- <svelte:fragment slot="trail">(actions)</svelte:fragment> -->
		</AppBar>
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
	<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>

<style>
	/* :global(input, textarea, p, span) { */
	/* 	cursor: url('/adwaita/text.png'), text !important; */
	/* } */
	/**/
	/* :global(a, button) { */
	/* 	cursor: url('/adwaita/pointer.png'), pointer !important; */
	/* } */
</style>
