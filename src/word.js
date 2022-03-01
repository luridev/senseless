import { writable, get } from "svelte/store";

const defaultMinWordLength = 3;
const defaultMaxWordLength = 5;
export const basicMinWordLength = 2;
export const basicMaxWordLength = 10;

const checkWordLength = (wordLength, defaultWordLength = defaultMinWordLength) => {
    if ((wordLength >= basicMinWordLength) && (wordLength <= basicMaxWordLength))
        return wordLength;
    return defaultWordLength;
}

export let minWordLength = writable(checkWordLength(parseInt(localStorage.getItem("minWordLength")), defaultMinWordLength));
minWordLength.subscribe(value => localStorage.setItem("minWordLength", checkWordLength(value, defaultMinWordLength)));

export let maxWordLength = writable(checkWordLength(parseInt(localStorage.getItem("maxWordLength")), defaultMaxWordLength));
maxWordLength.subscribe(value => localStorage.setItem("maxWordLength", checkWordLength(value, defaultMaxWordLength)));


export let defaultSeparator = 'none';

export const separators = {
    none: {
        name: 'нет',
        char: '',
    },
    space: {
        name: 'пробел',
        char: ' ',
    },
    dash: {
        name: 'тире',
        char: '-',
    },
};

const checkSeparator = (delimiter, def = defaultSeparator) => separators[delimiter] ? delimiter : def;

export let separator = writable(checkSeparator(localStorage.getItem("delimiter"), defaultSeparator));
separator.subscribe(value => localStorage.setItem("delimiter", checkSeparator(value, defaultSeparator)));

export const getSeparator = () => separators[checkSeparator(get(separator))].char;

const vowels = "аеиоуыэюя".split("");
const consonants = "бвгджзклмнпрстфхцчшщ".split("");
const letters = "абвгдежзиклмнопрстуфхцчшщыэюя".split("");

const getRandomInt = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomElement = (arr) => {
    return arr[getRandomInt(0, arr.length - 1)];
}

const genSyllable = (length = 2) => {
    let syllable = "";
    switch (length) {
        case 1:
            syllable = getRandomElement(vowels);
            break;
        case 2:
            if (getRandomInt(1, 3))
                syllable = `${getRandomElement(vowels)}${getRandomElement(consonants)}`;
            else
                syllable = `${getRandomElement(consonants)}${getRandomElement(vowels)}`;
            break;
        case 3:
            switch (getRandomInt(1, 3)) {
                case 1:
                    syllable = `${getRandomElement(consonants)}${getRandomElement(vowels)}${getRandomElement(consonants)}`;
                    break;
                case 2:
                    syllable = `${getRandomElement(vowels)}${getRandomElement(consonants)}${getRandomElement(consonants)}`;
                    break;
                case 3:
                    syllable = `${getRandomElement(consonants)}${getRandomElement(consonants)}${getRandomElement(vowels)}`;
                    break;
            };
            break;
    }
    return syllable;
};

const genRandom = (length = 2) => {
    let syllable = "";
    for (let i = 0; i < length; i += 1) {
        syllable = `${syllable}${getRandomElement(letters)}`;
    };
    return syllable;
}

export const defaultGenType = 'random';
export const generators = {
    random: {
        name: 'случайный',
        generate: genRandom,
    },
    syllable: {
        name: 'по слогам',
        generate: genSyllable,
    },
};
const checkGenType = (type, def = defaultGenType) => generators[type] ? type : def;

export let generator = writable(checkGenType(localStorage.getItem("genType"), defaultGenType));
generator.subscribe(value => localStorage.setItem("genType", checkGenType(value, defaultGenType)));

export const genWord = () => {
    const maxLength = getRandomInt(get(minWordLength), get(maxWordLength));
    let word = [];
    let length = 0;
    while (maxLength - length > 0) {
        const count = (maxLength - length < 3) ? maxLength - length : getRandomInt((getRandomInt(0, 10) === 0) ? 1 : 2, 3);
        word.push(generators[get(generator)].generate(count));
        length += count;
    }
    return word;
};