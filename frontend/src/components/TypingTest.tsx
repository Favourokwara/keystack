"use client"
import useDictionaryComparator from '@/hooks/useDictionaryComparator';
import React, { useEffect, useRef, useState } from 'react'
import WordsWrapper from './WordsWrapper';
import { trpc } from '@/app/api/trpc/[trpc]/_trpc/client';

const TypingTest = () => {
    

    const { expected, actually, handleKeydown, handleReload } = useDictionaryComparator();

    // Todo: Use custom hook for input
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
            <WordsWrapper expected={expected ??[]} actually={actually??[]} isFocus={isFocused} handleFocus={handleFocus} />
            <button type="button" className='p-4' onClick={handleReload} ></button>
        </div>
    )
}

export default TypingTest;