<script lang="ts">
	import { type PaginationSettings, Paginator } from '@skeletonlabs/skeleton';
	import cursors from '$lib/data/cursors';
	import customCursorTheme from '$lib/stores/customCursorTheme';
	import { onMount } from 'svelte';
	let gridXLClass: string = 'xl:grid-cols-2';
	let timeoutID: ReturnType<typeof setTimeout> | undefined;
	let isTouchDevice: boolean;

	let paginationSettings = {
		page: 0,
		limit: 4,
		size: cursors.length,
		amounts: [2, 4, 6, 10, 36]
	} satisfies PaginationSettings;

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

		console.info('cursorName', cursorName);
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

	$: paginatedSource = cursors.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
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
		console.log($customCursorTheme.isOn);

		if ($customCursorTheme.isOn && !isTouchDevice) {
			console.log('bomdia');
			return `url(/${$customCursorTheme.cursorTheme}/${cssName}.png), ${cssName}`;
		}

		return cssName;
	};
	onMount(() => {
		isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	});
</script>

<div class="flex flex-col justify-center gap-6 items-center min-h-screen">
	<div class="min-h-[400px] flex flex-col justify-center 2xl:min-h-[500px]">
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
					class="logo-item px-4 rounded-none outline-none variant-ringed-primary"
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
		showFirstLastButtons={true}
		select="select min-w-[150px] cursor-pointer"
		buttonClasses="!px-3 !py-1.5 fill-current disabled:fill-gray-400"
		justify="justify-center"
		amountText="Cursors"
		showPreviousNextButtons={true}
	/>
</div>
