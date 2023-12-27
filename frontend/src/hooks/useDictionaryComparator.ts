import { trpc } from "@/app/api/trpc/[trpc]/_trpc/client";
import DictionaryComparator from "@/model/DictionaryComparator";
import { sampleSize } from "lodash";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

export default function useDictionaryComparator() {

    const [words, setWords] = useState<string[]>();
    const comparatorRef = useRef<DictionaryComparator>();

    const [expected, setExpected] = useState(comparatorRef.current?.getReferenceSentence());
    const [actually, setActually] = useState(comparatorRef.current?.getTypedSentence());

    const { data, isLoading, error, refetch } = trpc.getWords.useQuery(
        { language: 'english' },
        {
            refetchInterval: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onSuccess: wordsList => {
                setWords(sampleSize(wordsList, 10));
            }
        }
    );

    const handleKeydown = async (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();  // prevent character input

        if (event.key.length === 1) {
            comparatorRef.current?.append(event.key);
            setActually(comparatorRef.current?.getTypedSentence());
        } else if (event.key.toLowerCase() === "backspace") {
            comparatorRef.current?.remove(event.ctrlKey);
            setActually(comparatorRef.current?.getTypedSentence());
        }
    }

    const handleReload = async () => {
        refetch();
    }

    useEffect(() => {
        if (words) {
            comparatorRef.current = new DictionaryComparator(words, 10);
            setExpected(comparatorRef.current?.getReferenceSentence());
            setActually(comparatorRef.current?.getTypedSentence());
        }
    }, [words])

    return { expected, actually, handleKeydown, handleReload }
}