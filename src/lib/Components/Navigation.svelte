<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { XIcon } from 'svelte-feather-icons';
	const drawerStore = getDrawerStore();

	const handleCloseDrawer = () => {
		drawerStore.close();
	};
</script>

<nav class="list-nav">
	<ul class="w-30">
		<li class="list-option">
			<a
				class="block card card-hover p-4 md:w-auto"
				href="/"
				on:click={handleCloseDrawer}>Home</a
			>
		</li>
		<li class="list-option">
			<a
				class="block card card-hover p-4 md:w-auto"
				href="/about">About</a
			>
		</li>

		<!--  TODO: for this rout, config for the grid, theme, maybe font? -->
		<li class="list-option">
			<a
				class="block card card-hover p-4 md:w-auto"
				href="/settings">Settings</a
			>
		</li>

		<li class="fixed bottom-0 left-[15%] md:left-[10%] md:mt-4">
			<button
				class="btn btn-circle card card-hover"
				on:click={handleCloseDrawer}
			>
				<XIcon size="32" />
			</button>
		</li>
	</ul>
</nav>
