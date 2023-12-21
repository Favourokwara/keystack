import React, { forwardRef } from 'react'
import Word from './Word';

const Words = forwardRef<HTMLDivElement, { reference: string[], expected: string[] }>(({ reference, expected }, focusRef) => {
    return (
        <div id="words">
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