<script lang="ts">
	import customCursorTheme, { type CursorsThemes } from '$lib/stores/customCursorTheme';
	import {
		type PopupSettings,
		popup,
		ListBox,
		ListBoxItem,
		SlideToggle,
		LightSwitch
	} from '@skeletonlabs/skeleton';
	import { IconArrowDown } from '@tabler/icons-svelte';

	const popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	let cursorTheme: CursorsThemes = $customCursorTheme.cursorTheme;

	const handleChangeCursorTheme = (
		e: Event & {
			currentTarget: EventTarget &
				HTMLInputElement & {
					value: CursorsThemes;
				};
		}
	): void => {
		customCursorTheme.set({ cursorTheme: e.currentTarget.value, isOn: $customCursorTheme.isOn });
	};

	const handleChangeCustomTheme = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		customCursorTheme.set({
			cursorTheme: $customCursorTheme.cursorTheme,
			isOn: e.currentTarget?.checked
		});
	};
</script>

<section
	class="min-h-screen xl:min-h-0 xl:flex xl:items-start xl:justify-center xl:mt-20 xl:w-1/4 xl:m-auto xl:variant-ringed-primary xl:rounded-lg"
>
	<ul class="list flex flex-col gap-8 justify-center items-center xl:w-full">
		<li class="flex p-4 w-full justify-between">
			<span class="text-bold text-lg">Toggle Dark Mode </span>
			<LightSwitch
				bgDark="variant-filled-surface"
				width="w-16"
				height="h-8"
			/>
		</li>

		<li class="flex p-4 w-full justify-between">
			<span class="text-bold text-lg"> Use Custom Cursor? </span>
			<SlideToggle
				name="customCursorThemeOn"
				background="variant-filled-surface"
				on:change={handleChangeCustomTheme}
				active="bg-primary-500"
				bind:checked={$customCursorTheme.isOn}
			/>
		</li>

		<li class="flex p-4 w-full justify-between">
			<span class="text-bold text-lg">Custom Cursor: </span>
			<button
				class="btn variant-filled"
				use:popup={popupCombobox}
			>
				<span class="capitalize">{$customCursorTheme.cursorTheme}</span>
				<span> <IconArrowDown /></span>
			</button>

			<div
				class="card shadow-xl p-2 variant-filled"
				data-popup="popupCombobox"
			>
				<ListBox rounded="rounded-lg">
					<ListBoxItem
						bind:group={cursorTheme}
						name="cursorThemeName"
						value="adwaita"
						rounded="rounded-lg"
						active="variant-filled-tertiary"
						hover="hover:variant-filled-primary"
						on:change={handleChangeCursorTheme}
						>Adwaita
					</ListBoxItem>
					<ListBoxItem
						bind:group={cursorTheme}
						name="cursorThemeName"
						hover="hover:variant-filled-primary"
						active="variant-filled-tertiary"
						on:change={handleChangeCursorTheme}
						value="macOS">MacOS</ListBoxItem
					>
					<ListBoxItem
						bind:group={cursorTheme}
						name="cursorThemeName"
						hover="hover:variant-filled-primary"
						active="variant-filled-tertiary"
						on:change={handleChangeCursorTheme}
						value="windows-ish">Windows-ish</ListBoxItem
					>
				</ListBox>
			</div>
		</li>
	</ul>
</section>
