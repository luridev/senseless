import { writable } from "svelte/store";

export let displayNext = writable(localStorage.getItem("displayNext") === 'true' ? true : false);
displayNext.subscribe(value => localStorage.setItem("displayNext", value ? 'true' : 'false'));

export let displayPrevious = writable(localStorage.getItem("displayPrevious") === 'true' ? true : false);
displayPrevious.subscribe(value => localStorage.setItem("displayPrevious", value ? 'true' : 'false'));

export const minFontSize = 5;
export const maxFontSize = 30;
const defaultFontSize = 10;
const checkFontSize = (size, def = defaultFontSize) => {
    if ((size >= minFontSize) && (size <= maxFontSize))
        return size;
    return def;
}

export let fontSize = writable(checkFontSize(parseInt(localStorage.getItem("fontSize")), defaultFontSize));
fontSize.subscribe(value => localStorage.setItem("fontSize", checkFontSize(value, defaultFontSize)));

export let playAnimation = writable(localStorage.getItem("playAnimation") === 'false' ? false : true);
playAnimation.subscribe(value => localStorage.setItem("playAnimation", value ? 'true' : 'false'));