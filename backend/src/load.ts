import { Glob } from "bun";
import { basename } from "path";
import { readFileSync } from "fs";
import { Dictionary, inRange, random, sampleSize, zipObject } from "lodash";


let words: Dictionary<string[]>; // {language : words} mapping of most common words

export function loadWords() {
    if (!words) {
        const paths = Array.from(
            new Glob("*").scanSync({
                cwd: "public/assets/common-words",
                absolute: true
            })
        );

        words = zipObject(
            paths.map(path => basename(path, ".txt")),
            paths.map(path => readFileSync(path)
                .toString()
                .split("\n")
                .filter(x => x)
            )
        )
    }
    return words;
}

interface WordsListProps {
    language?: string;
    exactly?: number;
    min?: number;
    max?: number;
    maxLength?: number;
    minLength?: number;
}

export function getWordList(
    {
        language = "english",
        exactly,
        min = 0,
        maxLength = Infinity,
        minLength = 0,
        max
    }: WordsListProps = {}): string[] {
    const languageWords = loadWords()[language].filter(word => inRange(word.length, minLength, maxLength + 1));

    if (exactly) { return sampleSize(languageWords, exactly); }

    if (min || max) {
        return sampleSize(
            languageWords,
            random(min, max || languageWords.length)
        );
    }
    return languageWords;
}

