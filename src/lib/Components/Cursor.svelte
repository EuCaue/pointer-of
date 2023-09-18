<script lang="ts">
	import { type PaginationSettings, Paginator } from '@skeletonlabs/skeleton';
	let gridMediumScreenValue: number = 2;

	//  TODO: make a server.ts, for mobile, and when users touch the buttons, show the cursors

	const cursors = [
		{
			cssName: 'auto',
			displayName: 'Auto'
		},
		{
			cssName: 'default',
			displayName: 'Default'
		},
		{
			cssName: 'none',
			displayName: 'None'
		},
		{
			cssName: 'context-menu',
			displayName: 'Context Menu'
		},
		{
			cssName: 'help',
			displayName: 'Help'
		},
		{
			cssName: 'pointer',
			displayName: 'Pointer'
		},
		{
			cssName: 'progress',
			displayName: 'Progress'
		},
		{
			cssName: 'wait',
			displayName: 'Wait'
		},
		{
			cssName: 'cell',
			displayName: 'Cell'
		},
		{
			cssName: 'crosshair',
			displayName: 'Crosshair'
		},
		{
			cssName: 'text',
			displayName: 'Text'
		},
		{
			cssName: 'vertical-text',
			displayName: 'Vertical Text'
		},
		{
			cssName: 'alias',
			displayName: 'Alias'
		},
		{
			cssName: 'copy',
			displayName: 'Copy'
		},
		{
			cssName: 'move',
			displayName: 'Move'
		},
		{
			cssName: 'no-drop',
			displayName: 'No Drop'
		},
		{
			cssName: 'not-allowed',
			displayName: 'Not Allowed'
		},
		{
			cssName: 'grab',
			displayName: 'Grab'
		},
		{
			cssName: 'grabbing',
			displayName: 'Grabbing'
		},
		{
			cssName: 'e-resize',
			displayName: 'E Resize'
		},
		{
			cssName: 'n-resize',
			displayName: 'N Resize'
		},
		{
			cssName: 'ne-resize',
			displayName: 'NE Resize'
		},
		{
			cssName: 'nw-resize',
			displayName: 'NW Resize'
		},
		{
			cssName: 's-resize',
			displayName: 'S Resize'
		},
		{
			cssName: 'se-resize',
			displayName: 'SE Resize'
		},
		{
			cssName: 'sw-resize',
			displayName: 'SW Resize'
		},
		{
			cssName: 'w-resize',
			displayName: 'W Resize'
		},
		{
			cssName: 'ew-resize',
			displayName: 'EW Resize'
		},
		{
			cssName: 'ns-resize',
			displayName: 'NS Resize'
		},
		{
			cssName: 'nesw-resize',
			displayName: 'NESW Resize'
		},
		{
			cssName: 'nwse-resize',
			displayName: 'NWSE Resize'
		},
		{
			cssName: 'col-resize',
			displayName: 'Col Resize'
		},
		{
			cssName: 'row-resize',
			displayName: 'Row Resize'
		},
		{
			cssName: 'all-scroll',
			displayName: 'All Scroll'
		},
		{
			cssName: 'zoom-in',
			displayName: 'Zoom In'
		},
		{
			cssName: 'zoom-out',
			displayName: 'Zoom Out'
		}
	];

	let paginationSettings = {
		page: 0,
		limit: 4,
		size: cursors.length,
		amounts: [2, 4, 6, 10, 36]
	} satisfies PaginationSettings;

	const handleAmount = (amount: CustomEvent<number>) => {
		if (amount.detail === 36) {
			gridMediumScreenValue = 12;
		} else {
			gridMediumScreenValue = 2;
		}
	};

	$: paginatedSource = cursors.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
</script>

<!--  TODO: make the ui for desktop -->
<div class="flex flex-col justify-center gap-6 items-center min-h-screen">
	<div class="min-h-[400px] flex flex-col justify-center 2xl:min-h-[500px]">
		<ul
			class="logo-cloud grid-cols-2 xl:grid-cols-{gridMediumScreenValue} xl:px-28 gap-4 w-auto px-2"
		>
			{#each paginatedSource as row}
				<li
					style="cursor: {row.cssName}"
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
