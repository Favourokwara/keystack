"use client"
import useDictionaryComparator from '@/hooks/useDictionaryComparator';
import React, { useEffect, useRef, useState } from 'react'
import WordsWrapper from './WordsWrapper';

const TypingTest = () => {
    const {expected, actually, handleKeydown} = useDictionaryComparator();
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    const handleFocus = () => {
        inputRef.current && inputRef.current.focus();
    }

    useEffect(() => {
        handleFocus()
    }, [])

    return (
        <div id="typingTest">
            <input id="wordsInput" type="text" onFocus={onFocus} onBlur={onBlur} onKeyDown={handleKeydown} ref={inputRef} />
            <WordsWrapper expected={expected} actually={actually} isFocus={isFocused} handleFocus={handleFocus} />
        </div>
    )
}

export default TypingTest;