import React, { forwardRef } from 'react'
import Word from './Word';

const Words = forwardRef<HTMLDivElement, { reference: string[], expected: string[], blurred?: boolean, yDisplacement?: number }>(({ reference, expected, blurred = false, yDisplacement = 0 }, focusRef) => {
    const wordsclass = [];

    if (blurred) {
        wordsclass.push("blurred");
    }

    return (
        <div id="words" className={ wordsclass.join(" ") } style={{transform: `translateY(${yDisplacement}px)`}} >
            {reference.map((word, index) => {
                return (
                    <Word key={index} actually={expected[index] || ""} expected={reference[index]} ref={index === expected.length - 1 ? focusRef : null} />
                );
            })}
        </div>
    )
});

Words.displayName = "Words";

export default Words;