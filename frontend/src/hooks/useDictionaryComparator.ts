import { trpc } from '@/app/api/trpc/[trpc]/_trpc/client';
import DictionaryComparator from '@/model/DictionaryComparator'
import { KeyboardEvent, useRef, useState } from 'react'

const useDictionaryComparator = () => {
    const reference = ["The", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"];
    const comparatorRef = useRef<DictionaryComparator>(new DictionaryComparator(reference, 10));

    const [expected, setExpected] = useState(comparatorRef.current.getReferenceSentence());
    const [actually, setActually] = useState(comparatorRef.current.getTypedSentence());

    const handleKeydown = async (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.key.length === 1) {
            comparatorRef.current.append(event.key);
            setActually(comparatorRef.current.getTypedSentence());
        } else if (event.key.toLowerCase() === "backspace") {
            comparatorRef.current.remove(event.ctrlKey);
            setActually(comparatorRef.current.getTypedSentence());
        }
    }

    return {expected, actually, handleKeydown};
}

export default useDictionaryComparator;