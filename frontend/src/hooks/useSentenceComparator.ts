import SentenceComparator from '@/model/SentenceComparator';
import { useEffect, useRef, useState } from 'react'

const useSentenceComparator = (refSentence: string[]) => {
    const comparator = useRef<SentenceComparator>(new SentenceComparator(refSentence));

    const [expected, setExpected] = useState(comparator.current.getReferSentence());
    const [actually, setActually] = useState(comparator.current.getTypedSentence());

    function handleKeydown(event: KeyboardEvent) {
        if (event.key.length === 1) {
            // single alpha-numeric keycap pressed
            comparator.current.add(event.key);
            setActually(comparator.current.getTypedSentence());
            console.log(actually);
            
        } else if (event.key.toLowerCase() === "backspace") {
            comparator.current.remove(event.ctrlKey);
            setActually(comparator.current.getTypedSentence());
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
    }, [])

    return { expected, actually };
}

export default useSentenceComparator;