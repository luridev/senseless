<svelte:head>
	<html lang="ru" />
	<title>senseless</title>
	<meta name="robots" content="noindex nofollow" />
	<meta charset="UTF-8">
</svelte:head>

<script>
	import Button, { Label } from '@smui/button';
	import { fade, fly } from "svelte/transition";

	import { minTimeout, maxTimeout, speedFactor } from "./speed.js";
	import { getSeparator, genWord } from "./word.js";
	import Settings from "./Settings.svelte";
	import { displayNext, displayPrevious, fontSize, playAnimation } from "./settings.js";

	import "../node_modules/svelte-material-ui/bare.css";

	let current = [];
	let next = [];
	let back = [];
	let settings = false;

	let timer = null;
	let played = false;

	const getTimeout = () => {
		return minTimeout + current.join('').length * maxTimeout / $speedFactor;
	};

	const play = () => {
		played = !played;
		step();
	};

	const step = () => {
		if (!played) return;
		back = $displayPrevious ? current : [];
		current = $displayNext ? next : genWord();
		next = $displayNext ? genWord() : [];
		timer = setTimeout(() => step(), getTimeout());
	}

	const noAnimFunc = () => {};

	const wordAnimation = (node, params) => {
		if ($playAnimation) return fly(node, params);
		return () => {};
	};

	const currentWordAnimation = (node, params) => {
		if ($playAnimation) return fade(node, params);
		return () => {};
	}

	$: animation = $playAnimation ? wordAnimation : noAnimFunc;
</script>

<div class="words" style="font-size: {`${$fontSize/10}rem`}">
{#if $displayNext}
{#key next}
	<span class="next" in:wordAnimation={{ y: -30, duration: minTimeout }}>{next.join(getSeparator())}</span>
{/key}
{/if}

{#key current}
	<span class="current" in:currentWordAnimation={{duration: minTimeout }}>{current.join(getSeparator())}</span>
{/key}

{#if $displayPrevious}
{#key back}
	<span class="back" in:wordAnimation={{ y: -50, duration: minTimeout }}>{back.join(getSeparator())}</span>
{/key}
{/if}
</div>

<div class="buttons">
<Button on:click={play} touch variant="raised">
  <Label>{played ? 'Стоп' : 'Старт'}</Label>
</Button>

<Button on:click={() => {settings = true}} touch>
  <Label>Настройки</Label>
</Button>
</div>

<Settings bind:open={settings}></Settings>

<style>
.buttons {
	position: absolute;
	bottom: 0;
	left: 50%;
	margin-right: -50%;
	transform: translateX(-50%);
	padding: 1rem;
}
.words {
	position: absolute;
	top: 45%;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
}
.words span {
	text-align: center;
	display: block;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.words .next {
	font-size: 1.5em;
	color: var(--mdc-theme-primary);
}
.words .current {
	font-size: 4em;
	color: #222;
	margin: 20px 0 50px;
}
.words .back {
	font-size: 1em;
	color: var(--mdc-theme-primary);
}
:root {
	--mdc-theme-primary: #5c5c5c;
	--mdc-theme-secondary: #5c5c5c;
	--mdc-theme-background: #eee;
	--mdc-theme-surface: #eee;
	--mdc-theme-error: #fff;
	--mdc-theme-on-primary: #eee;
	--mdc-theme-on-secondary: #5c5c5c;
	--mdc-theme-on-surface: #eee;
	--mdc-theme-on-error: #fff;
}
:global(body) {
	background-color: #eee;
}
</style>