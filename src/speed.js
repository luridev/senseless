import { writable, get } from "svelte/store";

export const defaultFactor = 5;
export const basicMinFactor = 1;
export const basicMaxFactor = 9;
export const minTimeout = 150;
export const maxTimeout = 1300;

export const checkSpeedFactor = (speedFactor, def = defaultFactor) => {
    if ((speedFactor >= basicMinFactor) && (speedFactor <= basicMaxFactor))
        return speedFactor;
    return def;
}

export let speedFactor = writable(checkSpeedFactor(parseInt(localStorage.getItem("speedFactor"))));
speedFactor.subscribe(value => localStorage.setItem("speedFactor", checkSpeedFactor(value)));
