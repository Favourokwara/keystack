"use client"
import React from 'react'
import Words from './Words';
import useDictionaryComparator from '@/hooks/useDictionaryComparator';

const WordsWrapper = () => {
    const [expected, actually] = useDictionaryComparator();
    
    return (
        <>
            <div id="wordsWrapper">
                <Words reference={expected} expected={actually} />
            </div>
        </>
    )
}

export default WordsWrapper;