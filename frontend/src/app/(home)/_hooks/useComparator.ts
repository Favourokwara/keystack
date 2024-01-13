import { trpc } from "@/app/_trpc/client";
import { KeyboardEvent, useEffect, useState } from "react";


/**
 * Hook responsible for comparing the difference between the typed sentence
 * and the reference sentence.
 * 
 * @param tolerance The allowed tolerance in character count for each word.
 */
export default function useComparator(tolerance: number = 10) {

    // stores the reference word list and expected words state.
    const [reference, setReference] = useState<string[]>(["the", "quick", "brown", "fox"]);
    const [expected, setExpected] = useState<string[]>(["", "", "", ""]);

    // stores the index of the word being focused on.
    const [focusIndex, setFocusIndex] = useState<number>(0);

    // const reloadComparator = async () => {
    //     const { data, isError } = await trpc.getWords.useQuery({ limit: 10 });

    //     setFocusIndex(0);
    //     setReference(data || [""]);
    //     setExpected((data || [""]).map(() => ""))
    // }

    const getFocusWord = (): string => { return expected[focusIndex]; }

    const canAppend = (): boolean => { return (reference[focusIndex].length + tolerance - getFocusWord().length) > 0 }

    const canRemove = (): boolean => { return !(isFirstWord() && getFocusWord() === "") && focusIndex < reference.length; }

    const isNotReferred = (): boolean => { return focusIndex >= reference.length; }

    const isFirstWord = (): boolean => { return focusIndex === 0 };

    const isLastWord = (): boolean => { return focusIndex === reference.length - 1; }

    const moveToNextWord = (): void => { setFocusIndex(focusIndex + 1); };

    const moveToPrevWord = (): void => { setFocusIndex(focusIndex - 1); };

    const canMoveToNextWord = (): boolean => { return (getFocusWord().length > 0) && (focusIndex < reference.length - 1); }

    const canMoveToPrevWord = (): boolean => {
        const previouslyEqual = reference[focusIndex - 1] === expected[focusIndex - 1];

        return focusIndex > 0 && focusIndex <= reference.length && !previouslyEqual && getFocusWord() === "";
    }

    const removeWord = (): void => {
        const currentFocus = focusIndex;
        if (canMoveToPrevWord()) {
            moveToPrevWord();
            setExpected([...expected.slice(0, currentFocus - 1), "", ...expected.slice(currentFocus)]);
        } else {
            setExpected([...expected.slice(0, currentFocus), "", ...expected.slice(currentFocus + 1)])
        }
    }

    const removeChar = (): void => {
        if (canMoveToPrevWord()) {
            moveToPrevWord()
            return;
        }
        setExpected([...expected.slice(0, focusIndex), getFocusWord().slice(0, -1), ...expected.slice(focusIndex + 1)]);
    }

    const remove = (entireWord = false): boolean => {
        if (!canRemove()) { return false; }

        if (entireWord) {
            removeWord();
        } else {
            removeChar();
        }
        return true;
    }

    const append = (char: string): boolean => {
        if (isNotReferred()) { return false; }

        if (canMoveToNextWord() && char === " ") {
            moveToNextWord();
            return true;
        } else if (canAppend() && char !== " ") {
            const focusedWord = getFocusWord();
            setExpected([...expected.slice(0, focusIndex), focusedWord + char, ...expected.slice(focusIndex + 1)])

            if (isLastWord() && reference[focusIndex] === focusedWord + char) {
                moveToNextWord();
            }
            return true;
        }
        return false;
    }

    const handleKeydown = (event: KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();

        if (event.key.length === 1) {
            append(event.key);
        } else if (event.key.toLowerCase() === "backspace") {
            remove(event.ctrlKey);
        }
    }


    return { reference, expected, focusIndex, handleKeydown };
}