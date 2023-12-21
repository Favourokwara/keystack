import DictionaryComparator from '@/model/DictionaryComparator'
import { useEffect, useRef, useState } from 'react'

const useDictionaryComparator = () => {
    const reference = ["The", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"];
    const comparatorRef = useRef<DictionaryComparator>(new DictionaryComparator(reference, 10));

    const [expected, setExpected] = useState(comparatorRef.current.getReferenceSentence());
    const [actually, setActually] = useState(comparatorRef.current.getTypedSentence());

    const handleKeydown = async (event: KeyboardEvent) => {
        if (event.key.length === 1) {
            comparatorRef.current.append(event.key);
            setActually(comparatorRef.current.getTypedSentence());
        } else if (event.key.toLowerCase() === "backspace") {
            comparatorRef.current.remove(event.ctrlKey);
            setActually(comparatorRef.current.getTypedSentence());
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => {
            document
                .addEventListener("keydown", handleKeydown);
        }
    }, [])

    return [expected, actually];
}

export default useDictionaryComparator;