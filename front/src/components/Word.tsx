import React, { forwardRef } from 'react'

const Word = forwardRef<HTMLDivElement, { expected: string, actually: string }>(({ expected, actually }, focusRef) => {
    const isFocus = focusRef != null;
    const hasExtra = expected.length < actually.length;

    const word = ["word"];

    if (actually != "" && !isFocus && actually != actually) {
        word.push("error");
    }

    if (hasExtra) {
        word.push("extra");
    }
    

    return (
        <span className={word.join(" ")} ref={isFocus && hasExtra? focusRef : null}>
            {((!hasExtra)? expected : actually).split("").map((_, index) => {
                const isExtra = expected[index] === undefined;

                const letter = ["letter"];

                if (actually[index] != undefined) {
                    letter.push((actually[index] === expected[index])
                                          ? "correct" : "incorrect");
                }

                return (<span key={index} className={letter.join(" ")} ref={isFocus && !hasExtra && index === actually.length? focusRef : null} >
                    {isExtra? actually[index] : expected[index]}
                </span>);
            })}
        </span>
    )
});

Word.displayName = "Word";

export default Word;