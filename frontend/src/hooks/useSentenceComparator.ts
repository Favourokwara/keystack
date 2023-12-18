import SentenceComparator from '@/model/SentenceComparator';
import React, { useEffect, useRef } from 'react'

const useSentenceComparator = (refSentence: string[]) => {
    const comparator = useRef<SentenceComparator>(new SentenceComparator(refSentence));

    function handleKeydown(event: KeyboardEvent) {
        if (event.key.length === 1) {
            // single keycap pressed
            comparator.current.add(event.key);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            
        })
    })    

    return {comparator}
}

export default useSentenceComparator;