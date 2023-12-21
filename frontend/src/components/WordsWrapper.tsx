import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import Words from './Words';

const WordsWrapper = ({expected, actually, handleFocus, isFocus = true}: {expected: string[], actually: string[], handleFocus: MouseEventHandler<HTMLDivElement>, isFocus?: boolean }) => {

    const cursorRef = useRef<HTMLDivElement>(null);

    // cursor position
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);

    const getPosition = async () => {
        const currentFocus = cursorRef.current;

        let x = currentFocus?.offsetLeft || 0;
        let y = currentFocus?.
                parentElement?.offsetTop || 0;

        if (currentFocus?.classList.contains("word")) {
            x += currentFocus.offsetWidth;
            y = currentFocus.offsetTop;
        }
        setX(x);
        setY(y);
    }

    useEffect(() => {
        window.addEventListener("resize",  getPosition);
        window.addEventListener("keydown", getPosition);
        getPosition();

        return () => {
            window.removeEventListener("resize",  getPosition);
            window.removeEventListener("keydown", getPosition);
        }
    }, [])

    return (
        <>
            <div id="wordsWrapper" onClick={handleFocus} >
                {isFocus && <div id="caret" style={{transform: `translateX(${x}px)`}} />}
                <Words reference={expected} expected={actually} ref={cursorRef} blurred={!isFocus} />
            </div>
        </>
    )
}

export default WordsWrapper;