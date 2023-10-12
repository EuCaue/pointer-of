<script lang="ts">
	import { page } from '$app/stores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { onDestroy, onMount } from 'svelte';
	import { IconX } from '@tabler/icons-svelte';
	const drawerStore = getDrawerStore();
	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!variant-filled-primary' : '';

	type Routes = {
		routeName: string;
		displayName: string;
	};

	const routes: Routes[] = [
		{
			routeName: '/',
			displayName: 'Home'
		},
		{
			routeName: '/about',
			displayName: 'About'
		},
		{
			routeName: '/settings',
			displayName: 'Settings'
		}
	];

	const handleCloseDrawer = () => {
		drawerStore.close();
	};
	onMount(() => {
		document.querySelectorAll('a').forEach((el) => {
			el.addEventListener('click', handleCloseDrawer);
		});
	});

	onDestroy(() => {
		document.querySelectorAll('a').forEach((el) => {
			el.removeEventListener('click', handleCloseDrawer);
		});
	});
</script>

<nav class="list-nav">
	<ul class="w-30">
		{#each routes as route}
			<li class="list-option">
				<a
					href={route.routeName}
					class="block card card-hover p4 md:w-auto {classesActive(route.routeName)}"
				>
					{route.displayName}
				</a>
			</li>
		{/each}
	</ul>
</nav>
