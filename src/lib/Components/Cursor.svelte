<script lang="ts">
	import { type PaginationSettings, Paginator } from '@skeletonlabs/skeleton';
	import cursors from '$lib/data/cursors';
	let gridXLClass: string = 'xl:grid-cols-2';

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

		cursorImg.src = `/adwaita/${cursorName}.png`;

		if (cursorName === 'progress' || cursorName === 'wait') {
			cursorImg.src = `/adwaita/${cursorName}.gif`;
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
</script>

<div class="flex flex-col justify-center gap-6 items-center min-h-screen">
	<div class="min-h-[400px] flex flex-col justify-center 2xl:min-h-[500px]">
		<ul class="logo-cloud grid-cols-2 {gridXLClass} xl:px-28 gap-4 w-auto px-2">
			{#each paginatedSource as row}
				<li
					style="cursor: {row.cssName}"
					on:touchstart={handleTouchStart}
					on:touchend={() => {
						const hasCursor = document.querySelector('#cursor');
						setTimeout(() => {
							if (hasCursor) hasCursor.remove();
						}, 1000);
					}}
					class="logo-item px-4 rounded-none outline-none border border-primary-200"
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
