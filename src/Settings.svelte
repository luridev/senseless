<script>
    import Button, { Label } from '@smui/button';
	import Slider from '@smui/slider';
	import FormField from '@smui/form-field';
	import { slide } from "svelte/transition";
	import Radio from '@smui/radio';
	import Checkbox from '@smui/checkbox';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';

	import { speedFactor, basicMinFactor as minSpeedFactor, basicMaxFactor as maxSpeedFactor } from "./speed.js";
	import { minWordLength, maxWordLength, basicMinWordLength, basicMaxWordLength,
		separator, separators,
		generator, generators,
	} from "./word.js";

	import { displayNext, displayPrevious, fontSize, minFontSize, maxFontSize, playAnimation } from "./settings.js";

  	export let open = false;


</script>

<Dialog
  bind:open
  aria-labelledby="slider-title"
  aria-describedby="slider-content"
>
  <Title id="slider-title">Настройки</Title>
  <Content id="slider-content">
	<FormField style="display: flex; flex-direction: column-reverse;">
	<Slider
		min={minSpeedFactor}
		max={maxSpeedFactor}
		style="flex-grow: 1;width: 100%;"
		bind:value={$speedFactor}
	/>
	<span
		slot="label"
		style="width: max-content; display: block;"
	>
		Скорость: {$speedFactor}
	</span>
	</FormField>
	<FormField style="display: flex; flex-direction: column-reverse;">
	<Slider
	range
	bind:start={$minWordLength}
	bind:end={$maxWordLength}
	min={basicMinWordLength}
	max={basicMaxWordLength}
	step={1}
	input$aria-label="Range slider"
	style="flex-grow: 1;width: 100%;"
	/>
	<span
		slot="label"
		style="width: max-content; display: block;"
	>
		Длина: {$minWordLength === $maxWordLength ? $minWordLength : `${$minWordLength} - ${$maxWordLength}`}
	</span>
	</FormField>

	<FormField style="display: flex; flex-direction: column-reverse;">
	<Slider
		min={minFontSize}
		max={maxFontSize}
		step={1}
		style="flex-grow: 1;width: 100%;"
		bind:value={$fontSize}
	/>
	<span
		slot="label"
		style="width: max-content; display: block;"
	>
		Размер шрифта: {$fontSize}
	</span>
	</FormField>

	<FormField style="display: flex; flex-direction: column-reverse; padding-bottom: 15px">
		<span slot="label">Тип генерации:</span>
	<div style="display: block">
	{#each Object.keys(generators) as option}
		<FormField>
		<Radio
			bind:group={$generator}
			value={option}
		/>
		<span
			slot="label"
			style="width: max-content; display: block;"
		>
			{generators[option].name}
		</span>
		</FormField>
	{/each}
	</div>
	</FormField>

	<FormField style="display: flex; flex-direction: column-reverse; padding-bottom: 15px">
		<span slot="label">Разделитель:</span>
	<div style="display: block">
	{#each Object.keys(separators) as option}
		<FormField>
		<Radio
			bind:group={$separator}
			value={option}
		/>
		<span
			slot="label"
			style="width: max-content; display: block;"
		>
			{separators[option].name}
		</span>
		</FormField>
	{/each}
	</div>
	</FormField>

	<div>
	<FormField>
		<Checkbox bind:checked={$displayPrevious} />
		<span slot="label">Показывать предыдущее слово</span>
	</FormField>
	</div>
	<div>
	<FormField>
		<Checkbox bind:checked={$displayNext} />
		<span slot="label">Показывать следующее слово</span>
	</FormField>
	</div>
	<div>
	<FormField>
		<Checkbox bind:checked={$playAnimation} />
		<span slot="label">Анимация слов</span>
	</FormField>
	</div>

</Content>
  <Actions>
    <Button action="accept">
		<Label>Ok</Label>
    </Button>
  </Actions>
</Dialog>
