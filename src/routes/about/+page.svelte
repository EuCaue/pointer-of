<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	const words: string[] = [
		'Why this website?\n Because I love experimenting with cursors and figured others might want to test all the cursors in their cursor themes too.\n I hope you find it handy. \u{1F600}'
	];

	let text: HTMLHeadingElement;
	let wordIndex: number = 0;
	let letterIndex: number = 0;
	$: stopTypewriter = false;

	const typewriter = (): void => {
		if (stopTypewriter) return;
		if (wordIndex < words.length) {
			const currentWord = words[wordIndex];
			if (letterIndex < currentWord.length) {
				text.innerText = currentWord.substring(0, letterIndex + 1);
				letterIndex++;
			}
			setTimeout(typewriter, 50);
		}
	};

	onMount(() => {
		typewriter();
	});

	onDestroy(() => {
		stopTypewriter = true;
	});
</script>

<div class="min-h-screen flex justify-center items-center transition-all ease-in-out px-4 2xl:p-0">
	<h1
		class="h2 2xl:w-1/2 2xl:text-center transition-all card card-hover h-max p-4 font-normal after:ml-3 after:border-l-4 after:animate-caret variant-ringed border text-left"
		bind:this={text}
	>
		{''}
	</h1>
</div>
