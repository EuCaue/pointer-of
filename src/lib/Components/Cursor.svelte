<script lang="ts">
	import { type PaginationSettings, Paginator } from '@skeletonlabs/skeleton';
	import Fuse from 'fuse.js';
	import cursors from '$lib/data/cursors';
	import customCursorTheme from '$lib/stores/customCursorTheme';
	import { onMount } from 'svelte';
	import { IconSearch } from '@tabler/icons-svelte';
	let gridXLClass: string = 'xl:grid-cols-2';
	let timeoutID: ReturnType<typeof setTimeout> | undefined;
	let isTouchDevice: boolean;
	let searchInputValue: string;

	let paginationSettings = {
		page: 0,
		limit: 4,
		size: cursors.length,
		amounts: [2, 4, 6, 10, 36]
	} satisfies PaginationSettings;

	$: paginatedSource = cursors.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	let fuse = new Fuse(cursors, {
		keys: ['displayName'],
		includeScore: false
	});

	const handleAmount = (amount: CustomEvent<number>) => {
		if (amount.detail === 36) {
			gridXLClass = 'xl:grid-cols-12';
		} else {
			gridXLClass = 'xl:grid-cols-2';
		}
	};

	const handleTouchStart = (
		e: TouchEvent & {
			currentTarget: EventTarget & HTMLLIElement;
		}
	) => {
		isTouchDevice = true;
		if (timeoutID) return;

		const hasCursor: Element | null = document.querySelector('#cursor');
		if (hasCursor) {
			hasCursor.remove();
		}

		const cursorName: string = e.currentTarget.style.cursor;
		if (cursorName === 'none') return;
		const touchCoordinates = {
			x: e.targetTouches[0].clientX,
			y: e.targetTouches[0].clientY
		} as const;

		const cursorImg: HTMLImageElement = document.createElement('img');

		cursorImg.src = `/${$customCursorTheme.cursorTheme}/${cursorName}.png`;

		if (cursorName === 'progress' || cursorName === 'wait') {
			cursorImg.src = `/${$customCursorTheme.cursorTheme}/${cursorName}.gif`;
		}

		cursorImg.width = 48;
		cursorImg.height = 48;
		cursorImg.style.position = 'fixed';
		cursorImg.style.left = String(touchCoordinates.y);
		cursorImg.style.top = String(touchCoordinates.x);
		cursorImg.id = 'cursor';
		e.currentTarget.appendChild(cursorImg);
	};

	const getCursorStyle = (cssName: string): string => {
		if (cssName === 'none') {
			return cssName;
		}

		if (
			$customCursorTheme.isOn &&
			!isTouchDevice &&
			(cssName === 'progress' || cssName === 'wait')
		) {
			return `url(/${$customCursorTheme.cursorTheme}/${cssName}.gif), ${cssName}`;
		}

		if ($customCursorTheme.isOn && !isTouchDevice) {
			return `url(/${$customCursorTheme.cursorTheme}/${cssName}.png), ${cssName}`;
		}

		return cssName;
	};

	const handleSearchCursors = (
		e: KeyboardEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	): void => {
		const cursorSearch = e.currentTarget.value;

		paginatedSource = fuse
			.search(cursorSearch)
			.map((obj) => obj.item)
			.slice(0, paginationSettings.limit);

		if (paginatedSource.length !== 0 && gridXLClass === 'xl:grid-cols-12') {
			gridXLClass = 'xl:grid-cols-2';
		}

		if (searchInputValue?.length <= 0 && paginatedSource?.length === 36) {
			gridXLClass = 'xl:grid-cols-12';
		}

		if (paginatedSource?.length <= 0) {
			paginatedSource = cursors.slice(
				paginationSettings.page * paginationSettings.limit,
				paginationSettings.page * paginationSettings.limit + paginationSettings.limit
			);
		}
	};

	onMount(() => {
		isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	});
</script>

<div class="flex flex-col justify-center gap-6 items-center min-h-screen">
	<div class="flex flex-col justify-center items-center gap-8">
		<label class="w-9/12 mt-4 max-w-md relative">
			<input
				bind:value={searchInputValue}
				class="input w-full"
				type="search"
				name="search-cursors"
				placeholder={'Search... '}
				on:keyup={handleSearchCursors}
			/>

			<IconSearch
				size={28}
				stroke={1}
				class="absolute top-2 right-4"
			/>
		</label>

		<ul class="logo-cloud grid-cols-2 {gridXLClass} xl:px-28 gap-4 w-auto px-2">
			{#each paginatedSource as row (row.cssName)}
				<li
					on:touchstart={handleTouchStart}
					style="cursor: {getCursorStyle(row.cssName)}"
					on:touchend={() => {
						const hasCursor = document.querySelector('#cursor');
						// NOTE: Check for a cursor in the DOM and ensure there are no timeouts in progress.
						if (hasCursor && timeoutID === undefined) {
							timeoutID = setTimeout(() => {
								hasCursor.remove();
							}, 1000);
							timeoutID = undefined;
						}
					}}
					class="logo-item px-4 {gridXLClass === 'xl:grid-cols-12'
						? ''
						: 'w-36 '} rounded-none outline-none variant-ringed-primary"
					title="This is how {row.displayName} looks like."
				>
					{row.displayName}
				</li>
			{/each}
		</ul>
	</div>

	<Paginator
		bind:settings={paginationSettings}
		on:amount={handleAmount}
		on:page={() => {
			if (searchInputValue?.length > 1) searchInputValue = '';
		}}
		showFirstLastButtons={true}
		select="select min-w-[150px] cursor-pointer"
		buttonClasses="!px-3 !py-1.5 fill-current disabled:fill-gray-400"
		justify="justify-center"
		amountText="Cursors"
		showPreviousNextButtons={true}
	/>
</div>
